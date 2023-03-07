import { CreateIcon } from './Icons/CreateIcon'
import { HomeIcon } from './Icons/HomeIcon'
import { MessagesIcon } from './Icons/MessagesIcon'
import { useState } from 'react'
import { PostsModal } from './PostsModal'
import { FriendsIcon } from './Icons/FriendsIcon'
import { useAuth } from 'context/authUserContext'
import { Dot } from './Icons/Dot'
import { useRouter } from 'next/router'

interface NavBarMobileProps {
  onNotificationClick?: (isOpen: boolean) => void
  isProfileOpen?: boolean
}

export const NavBarMobile = ({ onNotificationClick, isProfileOpen }: NavBarMobileProps) => {
  const { authUser } = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const path = router.route.split('/')[1]
  const atHome = path === ''
  const atFriends = path === 'friends'
  const atChats = path === 'chats'

  const handleClickAdd = () => {
    setShowModal(true)
  }

  return (
   <>
    <nav className="fixed bottom-5 bg-dark-green z-10 w-4/5 h-14 rounded-xl left-1/2 transform -translate-x-1/2 flex items-center justify-evenly">
      <HomeIcon width={30} height={30} fill='none' stroke='#FD8C77'/>
      <MessagesIcon width={30} height={30} fill='none' stroke='#FD8C77'/>
      <div className='relative'>
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

    {
      typeof window !== 'undefined' && <PostsModal showModal={showModal} setShowModal={setShowModal}/>
    }
   </>
  )
}
