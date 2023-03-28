import { db } from '@firebase/client'
import { PostPageLayout } from 'components/Posts/PostPageLayout'
import { MainPageLayout } from 'components/Utils/MainPageLayout'
import { doc } from 'firebase/firestore'
import { Spinner } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { GroupPostCollection, PostCollection } from 'types/databaseTypes'

interface PostsGroupProps {
  post: PostCollection
  id: string
  postId: string
}

export default function PostsGroup ({ post, id, postId }: PostsGroupProps) {
  const [value, loading, error] = useDocument(doc(db, 'groupPosts', postId as string))
  const [toggleSideBarNotifications, setToggleSideBarNotifications] = useState(false)

  if (loading) {
    return (
    <div className='h-screen grid place-content-center'>
      <Spinner/>
    </div>
    )
  }

  const props: GroupPostCollection = value?.data() ?? post

  props.comments?.reverse()

  if (error) return <p>There was an error...</p>

  if (props !== undefined) {
    return (
      <MainPageLayout>
        <PostPageLayout
          loading={loading}
          props={props}
          setToggleSideBarNotifications={setToggleSideBarNotifications}
          toggleSideBarNotifications={toggleSideBarNotifications}
          postId={id}
          postGroupId={postId}
        />
      </MainPageLayout>
    )
  }
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id, postId } = context.query
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/${id}/post/${postId}`)
  if (apiRes.ok) {
    const post = await apiRes.json()
    return { props: { post, id, postId } }
  }
}
