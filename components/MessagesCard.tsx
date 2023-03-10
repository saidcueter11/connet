import { useAuth } from 'context/authUserContext'

interface MessagesCardProps {
  userId: string
  content: string
}

export const MessagesCard = ({ userId }: MessagesCardProps) => {
  const { authUser } = useAuth()
  return (
    <>
      {
        authUser?.uid === userId
          ? <div className='bg-light-green grid rounded-2xl rounded-br-none shadow w-4/5 shadow-black/25 ml-auto p-4 pb-0'>
              <p className='font-karla text-text-dark-green pb-3'>Random message lor </p>
              <time className='font-karla text-action-red pb-2'>10:45 PM</time>
            </div>
          : <div className='bg-dark-green grid rounded-2xl rounded-bl-none shadow w-4/5 shadow-black/25 p-4 pb-0'>
              <p className='font-karla text-ligth-text-green pb-3'>Random message lor </p>
              <time className='font-karla text-action-red-ligth pb-2'>10:45 PM</time>
            </div>
      }

    </>
  )
}
