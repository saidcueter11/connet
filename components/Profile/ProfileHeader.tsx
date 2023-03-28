import { Avatar } from 'flowbite-react'
import { FriendsIcon } from '../Icons/FriendsIcon'
import { GroupIcon } from '../Icons/GroupsIcon'
import { SendIcon } from '../Icons/SendIcon'
import Link from 'next/link'
import { useAuth } from 'context/authUserContext'
import { EditIcon } from '../Icons/EditIcon'
import { StartNewMessageModal } from 'components/Modal/StartNewMessageModal'
import { useState } from 'react'
import { useRouter } from 'next/router'

interface ProfileHeaderProps {
  displayName: string
  userId?: string
  loading?: boolean
  chatingWith?: {
    userId: string,
    chatId: string
  }[]
  avatar?: string
  program?: string
}

export const ProfileHeader = ({ displayName, userId, loading, chatingWith, avatar, program }: ProfileHeaderProps) => {
  const { authUser } = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const handleStartChat = () => {
    if (chatingWith?.length) {
      const currentChat = chatingWith.find(chat => chat.userId === authUser?.uid)
      router.push(`/messages/${authUser?.uid}/chat/${currentChat?.chatId}`)
    }

    if (!chatingWith?.length)setShowModal(true)
  }
  return (
    <>
      <div className='grid justify-items-center grid-rows-2 grid-cols-3 items-center w-full'>
        <div className='self-end justify-self-end'>
          <button className='rounded-full bg-dark-green h-12 w-12 row-start-1 row-end-1 self-end justify-self-end'>
            <GroupIcon width={28} height={28} stroke='#FD8C77' fill='none' id={userId}/>
          </button>
          <p className='font-concert-one text-text-dark-green'>Groups</p>
        </div>
        <Link href={`/profile/${userId}`} className='row-start-2 row-end-2 col-span-3 self-start'>
          <Avatar size={'lg'} rounded={true} img={avatar} className='avatar-img'/>
          {
            loading
              ? <h1 className='justify-self-center font-concert-one text-xl text-text-dark-green text-center'></h1>
              : <h1 className='justify-self-center font-concert-one text-xl text-text-dark-green text-center'>{displayName}</h1>
          }
        </Link>

        <div className='col-start-2 col-end-2 flex flex-col items-center justify-center'>
          <button className='rounded-full bg-dark-green h-12 w-12 col-start-2 col-end-2'>
            <FriendsIcon width={26} height={26} stroke='#FD8C77' fill='none' id={userId}/>
          </button>
          <p className='font-concert-one text-text-dark-green'>Friends</p>
        </div>
        <div className='flex flex-col items-center row-start-1 row-end-1 col-start-3 col-end-3 self-end justify-self-start'>
          <button className='rounded-full bg-dark-green h-12 w-12'>
            {
              authUser?.uid === userId
                ? <Link href={`/setting/${userId}`}><EditIcon width={28} height={28} stroke='#FD8C77' fill='none'/></Link>
                : <div onClick={handleStartChat}><SendIcon width={28} height={28} stroke='#FD8C77' fill='none' /></div>
            }
          </button>
          <p className='font-concert-one text-text-dark-green text-center'>
            {
              authUser?.uid === userId
                ? 'Edit'
                : 'Message'
            }
          </p>
        </div>

        {
          program && <h2 className='font-karla text-center my-2 col-span-3 max-w-md text-dark-green'>{program}</h2>
        }
      </div>

      <StartNewMessageModal showModal={showModal} setShowModal={setShowModal} receiverName={displayName} receiverId={userId}/>
    </>
  )
}
