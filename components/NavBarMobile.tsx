import { CreateIcon } from './Icons/CreateIcon'
import { HomeIcon } from './Icons/HomeIcon'
import { MessagesIcon } from './Icons/MessagesIcon'
import { NotificationIcon } from './Icons/NotificationIcon'
import { useState } from 'react'
import { AddModal } from './AddModal'

interface NavBarMobileProps {
  onNotificationClick: (isOpen: boolean) => void
  isProfileOpen: boolean
}

export const NavBarMobile = ({ onNotificationClick, isProfileOpen }: NavBarMobileProps) => {
  const [showModal, setShowModal] = useState(false)
  const handleClick = () => {
    if (!isProfileOpen) onNotificationClick(true)
  }

  const handleClickAdd = () => {
    setShowModal(true)
  }

  return (
   <>
    <nav className="fixed bottom-5 bg-dark-green z-10 w-4/5 h-14 rounded-xl left-1/2 transform -translate-x-1/2 flex items-center justify-evenly">
      <HomeIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      <MessagesIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      <div onClick={handleClick}>
        <NotificationIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      </div>
      <div onClick={handleClickAdd}>
        <CreateIcon width={30} height={30} fill='none' stroke='#EB6440' />
      </div>
    </nav>

    {
      typeof window !== 'undefined' && <AddModal showModal={showModal} setShowModal={setShowModal}/>
    }
   </>
  )
}
