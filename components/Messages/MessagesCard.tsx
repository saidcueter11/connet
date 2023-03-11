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
          ? <div className='bg-light-green grid rounded-2xl rounded-br-none shadow max-w-[75%] min-w-[40%] shadow-black/25 ml-auto p-4 pb-0'>
              <p className='font-karla text-text-dark-green pb-3 w-fit'>{content}</p>
                {
                  imgUrl &&
                    <a href={imgUrl} target='_blank' className='flex justify-center pb-2' rel="noreferrer">
                      <img src={imgUrl} className='rounded w-4/5 object-cover'/>
                    </a>
                }
              <time className='font-karla text-action-red pb-2 text-end'>{time}</time>
            </div>
          : <div className='bg-dark-green grid rounded-2xl rounded-bl-none min-w-[40%] shadow max-w-[75%] shadow-black/25 p-4 pb-0 mr-auto'>
              <p className='font-karla text-ligth-text-green pb-3 w-fit'>{content}</p>
                {
                  imgUrl &&
                    <a href={imgUrl} target='_blank' className='flex justify-center pb-2' rel="noreferrer">
                      <img src={imgUrl} className='rounded w-4/5 object-cover'/>
                    </a>
                }
              <time className='font-karla text-action-red-ligth pb-2 w-fit'>{time}</time>
            </div>
      }

    </>
  )
}
