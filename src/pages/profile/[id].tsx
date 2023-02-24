import { db } from '@firebase/client'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { PostCard } from 'components/PostCard'
import { ProfileHeader } from 'components/ProfileHeader'
import { collection, query, where } from 'firebase/firestore'
import { Spinner } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import { PostCollection, UserCollection } from 'types/databaseTypes'

interface ProfileProps {
  posts: PostCollection[]
  id: string
  user: UserCollection
}

export default function Profile ({ posts, id, user }: ProfileProps) {
  const router = useRouter()
  const userId = id ?? router.query.id
  console.log({ userId })
  const q = query(collection(db, 'posts'), where('userId', '==', userId as string))
  const [value, loading, error] = useCollection<PostCollection>(q)

  if (loading) {
    return (
    <div className='h-screen grid place-content-center'>
      <Spinner/>
    </div>
    )
  }

  if (error) return <p>There was an error...</p>

  const snap = value?.docs.map(post => {
    const data = post.data()
    const { id } = post
    return { ...data, id }
  })

  const props = posts ?? snap ?? []
  console.log({ props, user })
  const fullName = `${user.firstName} ${user.lastName}` ?? ''

  return (
    <div className='flex flex-col gap-3'>
      <ArrowLeft width={24} height={24} stroke={'black'}/>

      <ProfileHeader displayName={fullName}/>

      <div className='flex flex-col gap-4 h-screen overflow-scroll no-scrollbar'>
          {
            props && props.map(post => <PostCard post={post} key={post.id} />)
          }

          <div className='p-6 h-32'></div>
          <div className='p-6 h-32'></div>
          <div className='p-6 h-32'></div>
        </div>
    </div>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id } = context.query
  const apiRes = await fetch(`http://localhost:3000/api/profile/${id}`)
  if (apiRes.ok) {
    const res = await apiRes.json()
    const { user, data } = res
    const [posts] = await Promise.all([data])
    return { props: { posts, id, user } }
  }
}
