import { CreateIcon } from './Icons/CreateIcon'
import { HomeIcon } from './Icons/HomeIcon'
import { MessagesIcon } from './Icons/MessagesIcon'
import { NotificationIcon } from './Icons/NotificationIcon'

export const NavBarMobile = () => {
  return (
    <nav className="fixed bottom-5 bg-dark-green w-4/5 h-14 rounded-xl left-1/2 transform -translate-x-1/2 flex items-center justify-evenly">
      <HomeIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      <MessagesIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      <NotificationIcon width={30} height={30} fill='none' stroke='#EB6440'/>
      <CreateIcon width={30} height={30} fill='none' stroke='#EB6440'/>
    </nav>
  )
}
