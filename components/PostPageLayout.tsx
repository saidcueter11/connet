import { PostCollection } from 'types/databaseTypes'
import { AddCommentForm } from './AddCommentForm'
import { CommentCard } from './CommentCard'
import ArrowLeft from './Icons/ArrowLeft'
import { NavBarMobile } from './NavBarMobile'
import { PostCard } from './PostCard'
import { ProfileHeader } from './ProfileHeader'
import { SideBarNotifications } from './SideBarNotifications'

interface PostPageLayoutProps {
  toggleSideBarNotifications: boolean,
  setToggleSideBarNotifications: (isOpen: boolean) => void,
  props: PostCollection,
  postId?: string,
  loading: boolean,
  postGroupId?: string
}

export const PostPageLayout = ({ toggleSideBarNotifications, setToggleSideBarNotifications, props, postId, loading, postGroupId }: PostPageLayoutProps) => {
  return (
    <>
      <SideBarNotifications toggle={toggleSideBarNotifications} onToggle={setToggleSideBarNotifications}/>
      <ArrowLeft width={24} height={24} stroke={'black'}/>

      <div className='flex flex-col gap-3 overflow-y-scroll h-full pb-28 no-scrollbar'>

        <ProfileHeader displayName={props.user?.displayName ?? ''} userId={props.userId}/>

        <div className='w-full m-auto'>
          <PostCard post={props}/>
        </div>

        <div className='flex flex-col gap-2'>
          <h3 className='font-concert-one text-lg text-text-dark-green'>Comments</h3>
          <AddCommentForm postId={postId as string} loading={loading} postGroupId={postGroupId} />

          {
            props.comments && props.comments.map(comment => <CommentCard comment={comment} key={comment.normalizedDate}/>)
          }
        </div>

        <NavBarMobile onNotificationClick={setToggleSideBarNotifications}/>
      </div>
    </>
  )
}
