import { CreateIcon } from './Icons/CreateIcon'
import { HomeIcon } from './Icons/HomeIcon'
import { MessagesIcon } from './Icons/MessagesIcon'
import { NotificationIcon } from './Icons/NotificationIcon'

interface NavBarMobileProps {
  onNotificationClick: (isOpen: boolean) => void
  isProfileOpen: boolean
}

export const NavBarMobile = ({ onNotificationClick, isProfileOpen }: NavBarMobileProps) => {
  const handleClick = () => {
    if (!isProfileOpen) onNotificationClick(true)
  }

  return (
    <nav className="fixed bottom-5 bg-dark-green z-10 w-4/5 h-14 rounded-xl left-1/2 transform -translate-x-1/2 flex items-center justify-evenly">
      <HomeIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      <MessagesIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      <div onClick={handleClick}>
        <NotificationIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      </div>
      <CreateIcon width={30} height={30} fill='none' stroke='#EB6440'/>
    </nav>
  )
}
