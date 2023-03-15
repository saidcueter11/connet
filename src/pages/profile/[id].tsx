import { db } from '../../../firebase/client'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { NavBarMobile } from 'components/Utils/NavBarMobile'
import { PostCard } from 'components/Posts/PostCard'
import { ProfileHeader } from 'components/Profile/ProfileHeader'
import { collection, doc, query, where } from 'firebase/firestore'
import { Spinner } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { PostCollection, UserCollection } from 'types/databaseTypes'

interface ProfileProps {
  posts: PostCollection[]
  id: string
  user: UserCollection
}

export default function Profile ({ posts, id, user }: ProfileProps) {
  const router = useRouter()
  const userId = id ?? router.query.id
  const qPosts = query(collection(db, 'posts'), where('userId', '==', userId as string))
  const collectionUser = collection(db, 'users')
  const docUser = doc(collectionUser, userId)
  const [valueUser, loadingUser, errorUser] = useDocument(docUser)
  const [value, loading, error] = useCollection<PostCollection>(qPosts)

  if (error || errorUser) return <p>There was an error...</p>

  if (loading || loadingUser) return <Spinner/>

  const snap = value?.docs.map(post => {
    const data = post.data()
    const { id } = post
    return { ...data, id }
  })

  const props = snap ?? posts ?? []
  const currentUser: UserCollection = valueUser?.data() ?? user
  const fullName = `${currentUser.firstName} ${currentUser.lastName}` ?? ''

  return (
    <>
      <ArrowLeft width={24} height={24} stroke={'black'}/>
      <div className='flex flex-col gap-3 overflow-y-scroll h-full pb-28 no-scrollbar'>

        <ProfileHeader displayName={fullName} loading={loadingUser ?? loading} userId={userId} chatingWith={currentUser.chatingWith}/>

        {
          loading || loadingUser
            ? <div className='h-full grid place-content-center'><Spinner/></div>
            : <div className='flex flex-col gap-4'>
                {
                  props && props.map(post => <PostCard post={post} key={post.id} />)
                }
              </div>
        }
      </div>

      <NavBarMobile/>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id } = context.query
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${id}`)
  if (apiRes.ok) {
    const res = await apiRes.json()
    const { user, data } = res
    const [posts] = await Promise.all([data])
    return { props: { posts, id, user } }
  }
}
