import { useAuth } from 'context/authUserContext'
import { Timestamp } from 'firebase/firestore'
import { useChatTime } from 'hooks/useTimeChat'

interface MessagesCardProps {
  userId: string
  content: string
  imgUrl: string
  createdAt: Timestamp
}

export const MessagesCard = ({ content, userId, imgUrl, createdAt }: MessagesCardProps) => {
  const { authUser } = useAuth()
  const time = useChatTime(createdAt)
  return (
    <>
      {
        authUser?.uid === userId
          ? <div className='bg-light-green grid rounded-2xl rounded-br-none shadow w-4/5 shadow-black/25 ml-auto p-4 pb-0'>
              <p className='font-karla text-text-dark-green pb-3'>{content}</p>
              <time className='font-karla text-action-red pb-2 text-end'>{time}</time>
            </div>
          : <div className='bg-dark-green grid rounded-2xl rounded-bl-none shadow w-4/5 shadow-black/25 p-4 pb-0'>
              <p className='font-karla text-ligth-text-green pb-3'>{content}</p>
              <time className='font-karla text-action-red-ligth pb-2'>{time}</time>
            </div>
      }

    </>
  )
}
