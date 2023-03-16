import { Dot } from 'components/Icons/Dot'
import { Timestamp } from 'firebase/firestore'
import { Avatar } from 'flowbite-react'
import { useTimeAgo } from 'hooks/useTimeAgo'
import Link from 'next/link'

interface NotificationCardContentProps {
  userName: string,
  createdAt: Timestamp,
  message: string,
  status: 'read' | 'unread',
  navigation: string
  callToAction: string
}

export const NotificationCardContent = ({ userName, createdAt, message, status, navigation, callToAction }: NotificationCardContentProps) => {
  const normalizeDate = +createdAt?.toDate()
  const timeAgo = useTimeAgo(normalizeDate)
  return (
    <>
      <Avatar rounded={true} size={'sm'} className='self-start pl-2'>
        <p className='font-concert-one text-sm flex'>
          {userName}
          {
            status === 'unread' && <span className='pt-1'><Dot width={18} height={18} fill='#8D4B3F' stroke='#8D4B3F'/></span>
          }
        </p>
        <p className='text-sm font-karla'>{message}</p>
      </Avatar>

      <Link href={navigation} className='bg-dark-green rounded-xl text-center w-2/4 pb-2 text-sm font-concert-one text-ligth-text-green'>{callToAction}</Link>

      <time className='absolute right-2 text-xs text-action-red'>{timeAgo}</time>
    </>
  )
}
