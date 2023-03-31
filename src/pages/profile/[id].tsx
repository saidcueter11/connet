import { db } from '../../../firebase/client'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { PostCard } from 'components/Posts/PostCard'
import { ProfileHeader } from 'components/Profile/ProfileHeader'
import { collection, doc, query, where } from 'firebase/firestore'
import { Spinner } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { PostCollection, UserCollection } from 'types/databaseTypes'
import { MainPageLayout } from 'components/Utils/MainPageLayout'
import { PageContenLayout } from 'components/Utils/PageContenLayout'

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

  const snap = value?.docs.map(post => {
    const data = post.data()
    const { id } = post
    return { ...data, id }
  })

  const props = snap ?? posts ?? []
  const sortedPosts = props && props.sort((a, b) => {
    if (a.createdAt && b.createdAt) { if (a.createdAt < b.createdAt) return 1 }
    return -1
  })

  const currentUser: UserCollection = valueUser?.data() ?? user
  const fullName = `${currentUser.firstName} ${currentUser.lastName}` ?? ''

  return (
    <>
      <MainPageLayout>
        <ArrowLeft width={24} height={24} stroke={'black'}/>
        <PageContenLayout>
          <ProfileHeader
            displayName={fullName}
            loading={loadingUser ?? loading}
            userId={userId}
            avatar={currentUser.avatar}
            chatingWith={currentUser.chatingWith}
            program={currentUser.program}
            />

          {
            loading || loadingUser
              ? <div className='grid place-content-center'><Spinner/></div>
              : <div className='flex flex-col gap-4'>
                  {
                    sortedPosts && sortedPosts.map(post => <PostCard post={post} key={post.id} />)
                  }
                </div>
          }
        </PageContenLayout>
      </MainPageLayout>

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
