import { useAuth } from 'context/authUserContext'
import { Avatar } from 'flowbite-react'
import Link from 'next/link'

interface MessageNotificationCardProps {
  userName: string
  chatId: string
}

export const MessageNotificationCard = ({ userName, chatId }: MessageNotificationCardProps) => {
  const { authUser } = useAuth()
  return (
    <div className='bg-light-green rounded-lg p-1 flex flex-col items-center gap-2'>
      <Avatar rounded={true} size={'sm'} className='self-start pl-2'>
        <p className='font-concert-one text-sm'>{userName}</p>
        <p className='text-sm font-karla'>Sent you a message</p>
      </Avatar>

      <Link href={`/messages/${authUser?.uid}/chat/${chatId}`} className='bg-dark-green rounded-xl text-center w-2/4 pb-2 text-sm font-concert-one text-ligth-text-green'>Check chat</Link>

    </div>
  )
}
