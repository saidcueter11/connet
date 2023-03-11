import { useAuth } from 'context/authUserContext'
import { Timestamp } from 'firebase/firestore'
import { Avatar } from 'flowbite-react'
import { useChatTime } from 'hooks/useTimeChat'
import Link from 'next/link'

interface MessagesPreviewCardProps {
  chatId: string
  lastMessageUser:string
  content: string
  createdAt: Timestamp
  directMessageUser: string
}

export const MessagesPreviewCard = ({ chatId, lastMessageUser, content, createdAt, directMessageUser }: MessagesPreviewCardProps) => {
  const { authUser } = useAuth()
  const time = useChatTime(createdAt)
  const id = chatId
  return (
    <>
      <Link href={`/messages/${authUser?.uid}/chat/${id}`} className='grid grid-cols-2 p-4 bg-light-green shadow shadow-black/25 rounded-2xl relative '>
          <Avatar rounded={true} className='col-span-2 self-start justify-self-start'>
            <p className='font-concert-one text-lg pb-2 text-text-dark-green'>{directMessageUser}</p>
          </Avatar>
          <p className='col-span-2 pl-14 font-karla text-text-dark-green'><strong>{authUser?.displayName?.includes(lastMessageUser) ? '(You)' : lastMessageUser}:</strong> {content}</p>

          <time className='absolute top-3 right-4 text-sm text-action-red font-karla'>{time}</time>
        </Link>
    </>
  )
}
