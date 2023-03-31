import { CreateIcon } from '../Icons/CreateIcon'
import { HomeIcon } from '../Icons/HomeIcon'
import { MessagesIcon } from '../Icons/MessagesIcon'
import { useEffect, useState } from 'react'
import { FriendsIcon } from '../Icons/FriendsIcon'
import { useAuth } from 'context/authUserContext'
import { Dot } from '../Icons/Dot'
import { useRouter } from 'next/router'
import { collection } from 'firebase/firestore'
import { db } from '@firebase/client'
import { useCollection } from 'react-firebase-hooks/firestore'
import { MessageCollection } from 'types/databaseTypes'
import { CreatePostModal } from 'components/Modal/CreatePostModal'

interface NavBarMobileProps {
  onNotificationClick?: (isOpen: boolean) => void
  isProfileOpen?: boolean
}

export const NavBarMobile = ({ onNotificationClick, isProfileOpen }: NavBarMobileProps) => {
  const { authUser } = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const path = router.route.split('/')[1]
  const atFriends = path === 'friends'
  const atMessages = path === 'messages'
  const atHome = path !== 'friends' && path !== 'messages'
  const [newMessages, setNewMessages] = useState(false)

  const collectionMessages = collection(db, 'messages')
  const [value, loading, error] = useCollection(collectionMessages)

  useEffect(() => {
    if (!loading && !error) {
      const messages = value?.docs.map(doc => doc.data()) as MessageCollection[]
      const currentUserMessages = messages.filter(m => m.receiverUser.id === authUser?.uid || m.senderUser === authUser?.uid)

      const isMessagesPending = currentUserMessages.some(m => m.messages.find(p => p.status === 'unread' && p.userId !== authUser?.uid))

      setNewMessages(isMessagesPending)
    }
  }, [value, loading])

  const handleClickAdd = () => {
    setShowModal(true)
  }

  return (
   <>
    <nav className="md:hidden fixed py-8 bottom-2 bg-dark-green z-10 w-4/5 h-14 rounded-xl left-1/2 transform -translate-x-1/2 flex items-center justify-evenly">
      <div className={`relative ${atHome ? 'scale-110' : ''}`}>
        <HomeIcon width={30} height={30} fill='none' stroke='#FD8C77'/>
        {
          atHome &&
            <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2'>
              <Dot width={20} height={20} fill='#FD8C77' />
            </div>
        }
      </div>

      <div className={`relative ${atMessages ? 'scale-110' : ''}`}>
        <MessagesIcon width={30} height={30} fill='none' stroke='#FD8C77' id={authUser?.uid as string}/>
        {
          newMessages &&
          <div className='absolute -top-2 -right-2'>
            <Dot width={24} height={24} fill='#D6E4E5' />
          </div>
        }
        {
          atMessages &&
            <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2'>
              <Dot width={20} height={20} fill='#FD8C77' />
            </div>
        }
      </div>
      <div className={`relative ${atFriends ? 'scale-110' : ''}`}>
        <FriendsIcon width={30} height={30} fill='none' stroke='#FD8C77' id={authUser?.uid}/>
        {
          atFriends &&
            <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2'>
              <Dot width={20} height={20} fill='#FD8C77' />
            </div>
        }
      </div>
      <div onClick={handleClickAdd}>
        <CreateIcon width={30} height={30} fill='none' stroke='#FD8C77' />
      </div>
    </nav>

    <CreatePostModal showModal={showModal} setShowModal={setShowModal} formId='create-post-mobile'/>

   </>
  )
}
