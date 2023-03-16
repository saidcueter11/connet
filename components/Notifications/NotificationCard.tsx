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
    <div className='bg-light-green rounded-lg py-2 px-1 flex flex-col items-center gap-2 relative'>
      {
        messages &&
          <NotificationCardContent
            createdAt={messages.createdAt}
            navigation={`/messages/${authUser?.uid}/chat/${messages.chatId}`}
            message={'Sent you a message'}
            status={messages.status}
            userName={messages.senderName}
            callToAction='Check chat'
            />
      }

      {
        commentedPost &&
          <NotificationCardContent
            createdAt={commentedPost.createdAt}
            navigation={`/post/${commentedPost.postCommentedId}`}
            message={'Commented one of your posts'}
            status={commentedPost.status}
            userName={commentedPost.userName}
            callToAction='Check post'
            />
      }

      {
        friendAdded &&
          <NotificationCardContent
            createdAt={friendAdded.createdAt}
            navigation={`/profile/${friendAdded.userId}`}
            message={'Added you as a friend'}
            status={friendAdded.status}
            userName={friendAdded.userName}
            callToAction='Check profile'
            />
      }

      {
        likedPost &&
          <NotificationCardContent
            createdAt={likedPost.createdAt}
            navigation={`/post/${likedPost.postLikedId}`}
            message={'Liked one of your posts'}
            status={likedPost.status}
            userName={likedPost.userName}
            callToAction='Check post'
            />
      }

    </div>
  )
}
