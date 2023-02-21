import { useEffect, useState } from 'react'
import { CloseIcon } from './Icons/CloseIcon'

interface SideBarNotificationsPros {
  toggle: boolean
  onToggle: (isOpen: boolean) => void
  isProfileOpen: boolean
}

export const SideBarNotifications = ({ toggle, onToggle, isProfileOpen }: SideBarNotificationsPros) => {
  const [toggleSideBarClass, setToggleSideBarClass] = useState('fixed top-0 right-0 z-40 w-64 h-screen transition-transform translate-x-full ')

  useEffect(() => {
    if (!isProfileOpen) {
      if (toggle) setToggleSideBarClass('fixed top-0 right-0 z-40 w-64 h-screen transition-transform')
      if (!toggle) setToggleSideBarClass('fixed top-0 right-0 z-40 w-64 h-screen transition-transform translate-x-full ')
    }
  }, [toggle])

  const handleSideBarToggle = () => {
    onToggle(false)
  }

  return (
    <div className='relative w-full'>
      <aside id="sidebar-multi-level-sidebar" className={toggleSideBarClass} aria-label="Sidebar">
        <div className="h-full px-5 py-4 overflow-y-hidden bg-dark-green dark:bg-gray-800">
          <div className='flex flex-col w-full h-full'>

            <div className='grid w-full h-8 grid-rows-1'>
              <div onClick={handleSideBarToggle} className='justify-self-start pt-2'>
                <CloseIcon fill='none' stroke='#EB6440' width={26} height={26}/>
              </div>
              <h2 className='justify-self-center font-concert-one text-xl text-ligth-text-green'>Notifications</h2>
            </div>

          </div>
        </div>
      </aside>

    </div>
  )
}
