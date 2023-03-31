import { useAuth } from 'context/authUserContext'
import { NotificationType } from 'types/databaseTypes'
import { NotificationCardContent } from './NotificationCardContent'

interface NotificationCardProps {
  notification: NotificationType
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { authUser } = useAuth()
  const { commentedPost, friendAdded, likedPost, messages } = notification

  return (
    <div className='bg-light-green rounded-lg py-2 px-1 flex flex-col items-center gap-2 relative w-full'>
      {
        messages &&
          <NotificationCardContent
            avatar={messages.senderAvatar}
            createdAt={messages.createdAt}
            navigation={`/messages/${authUser?.uid}/chat/${messages.chatId}`}
            message={'Sent you a message'}
            status={messages.status}
            userName={messages.senderName}
            callToAction='Check chat'
            event='messages'
            chatId={messages.chatId}
            />
      }

      {
        commentedPost &&
          <NotificationCardContent
            avatar={commentedPost.userAvatar}
            createdAt={commentedPost.createdAt}
            navigation={`/post/${commentedPost.postCommentedId}`}
            message={'Commented one of your posts'}
            status={commentedPost.status}
            userName={commentedPost.userName}
            callToAction='Check post'
            event='commentedPost'
            postId={commentedPost.postCommentedId}
            />
      }

      {
        friendAdded &&
          <NotificationCardContent
            avatar={friendAdded.userAvatar}
            createdAt={friendAdded.createdAt}
            navigation={`/profile/${friendAdded.userId}`}
            message={'Added you as a friend'}
            status={friendAdded.status}
            userName={friendAdded.userName}
            callToAction='Check profile'
            event='friendAdded'
            friendId={friendAdded.userId}
            />
      }

      {
        likedPost &&
          <NotificationCardContent
            avatar={likedPost.userAvatar}
            createdAt={likedPost.createdAt}
            navigation={`/post/${likedPost.postLikedId}`}
            message={'Liked one of your posts'}
            status={likedPost.status}
            userName={likedPost.userName}
            callToAction='Check post'
            event='likedPost'
            postId={likedPost.postLikedId}
            />
      }

    </div>
  )
}
