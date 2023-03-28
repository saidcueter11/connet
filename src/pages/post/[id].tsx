import { PostCollection } from 'types/databaseTypes'
import { useDocument } from 'react-firebase-hooks/firestore'
import { db } from '@firebase/client'
import { doc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { PostPageLayout } from 'components/Posts/PostPageLayout'
import { MainPageLayout } from 'components/Utils/MainPageLayout'

interface PostProps {
  id: string
  post: PostCollection
}

export default function Post ({ id, post }: PostProps) {
  const [value, loading, error] = useDocument(doc(db, 'posts', id as string))
  const [toggleSideBarNotifications, setToggleSideBarNotifications] = useState(false)

  if (loading) {
    return (
    <MainPageLayout></MainPageLayout>
    )
  }

  const props: PostCollection = value?.data() ?? post

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
      />
    </MainPageLayout>
    )
  }
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id } = context.query
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`)
  if (apiRes.ok) {
    const post = await apiRes.json()
    return { props: { post, id } }
  }
}
