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
        avatar={props.user?.avatar}
        />
      <section className='md:col-span-5 md:mt-16 mt-12'>
        <div className='w-full m-auto md:m-0 md:p-0'>
          <PostCard post={props}/>
        </div>

        <div className='grid gap-4 pt-4 w-full'>

          <h3 className='font-concert-one text-lg text-text-dark-green md:pl-2'>Comments</h3>
          <AddCommentForm postId={postId as string} loading={loading} postGroupId={postGroupId} postUserId={props.userId as string} />
          {
            props.comments && props.comments.map(comment => <CommentCard comment={comment} key={comment.normalizedDate}/>)
          }

        </div>

      </section>

      <NavBarMobile onNotificationClick={setToggleSideBarNotifications}/>
    </>
  )
}
