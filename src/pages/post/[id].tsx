import { AddCommentForm } from 'components/AddCommentForm'
import { CommentCard } from 'components/CommentCard'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { PostCard } from 'components/PostCard'
import { PostCollection } from 'types/databaseTypes'
import { useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../../../firebase/client'
import { doc } from 'firebase/firestore'
import { ProfileHeader } from 'components/ProfileHeader'
import { GetServerSidePropsContext } from 'next'
import { Spinner } from 'flowbite-react'
import { NavBarMobile } from 'components/NavBarMobile'
import { useState } from 'react'
import { SideBarNotifications } from 'components/SideBarNotifications'

interface PostProps {
  id: string
  post: PostCollection
}

export default function Post ({ id, post }: PostProps) {
  const [value, loading, error] = useDocument(doc(db, 'posts', id as string))
  const [toggleSideBarNotifications, setToggleSideBarNotifications] = useState(false)

  if (loading) {
    return (
    <div className='h-screen grid place-content-center'>
      <Spinner/>
    </div>
    )
  }

  const props: PostCollection = value?.data() ?? post

  props.comments?.reverse()

  if (error) return <p>There was an error...</p>

  if (props !== undefined) {
    return (
    <>
      <SideBarNotifications toggle={toggleSideBarNotifications} onToggle={setToggleSideBarNotifications}/>
      <ArrowLeft width={24} height={24} stroke={'black'}/>

      <div className='flex flex-col gap-3 overflow-y-scroll h-full pb-28 no-scrollbar'>

        <ProfileHeader displayName={props.user?.displayName ?? ''} userId={post.userId}/>

        <div className='w-full m-auto'>
          <PostCard post={props}/>
        </div>

        <div className='flex flex-col gap-2'>
          <h3 className='font-concert-one text-lg text-text-dark-green'>Comments</h3>
          <AddCommentForm postId={id as string} loading={loading} />

          {
            props.comments && props.comments.map(comment => <CommentCard comment={comment} key={comment.normalizedDate}/>)
          }
        </div>

        <NavBarMobile onNotificationClick={setToggleSideBarNotifications}/>
      </div>
    </>
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
