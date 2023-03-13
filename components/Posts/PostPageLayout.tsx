import { GroupPostCollection } from 'types/databaseTypes'
import { AddCommentForm } from '../Forms/AddCommentForm'
import { CommentCard } from './CommentCard'
import { NavBarMobile } from '../Utils/NavBarMobile'
import { PostCard } from './PostCard'
import { PostPageHeader } from './PostPageHeader'

interface PostPageLayoutProps {
  toggleSideBarNotifications: boolean,
  setToggleSideBarNotifications: (isOpen: boolean) => void,
  props: GroupPostCollection,
  postId?: string,
  loading: boolean,
  postGroupId?: string,
}

export const PostPageLayout = ({ toggleSideBarNotifications, setToggleSideBarNotifications, props, postId, loading, postGroupId }: PostPageLayoutProps) => {
  return (
    <>
      <PostPageHeader
        displayName={props.user?.displayName as string}
        userId={props.userId as string}
        groupName={props.groupName}
        groupId={props.groupId}
        />
      <div className='h-full overflow-y-scroll no-scrollbar pb-20'>
        <div className='w-full m-auto pt-16'>
          <PostCard post={props}/>
        </div>

        <div className='grid gap-4 pt-4'>
          <h3 className='font-concert-one text-lg text-text-dark-green'>Comments</h3>
          <AddCommentForm postId={postId as string} loading={loading} postGroupId={postGroupId} />

          {
            props.comments && props.comments.map(comment => <CommentCard comment={comment} key={comment.normalizedDate}/>)
          }
        </div>

      </div>

      <NavBarMobile onNotificationClick={setToggleSideBarNotifications}/>
    </>
  )
}
