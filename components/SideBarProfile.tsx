import { logoutWithEmail } from '@firebase/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CloseIcon } from './Icons/CloseIcon'
import { Avatar } from 'flowbite-react'
import { SettingsIcon } from './Icons/SettingsIcon'
import { LogoutIcon } from './Icons/LogoutIcon'
import { useAuth } from 'context/authUserContext'
import Link from 'next/link'

interface SideBarProfileProps {
  isNotificationOpen: boolean
  isOpen: (isOpen: boolean) => void
}

export const SideBarProfile = ({ isNotificationOpen, isOpen }:SideBarProfileProps) => {
  const [toggleSideBar, setToggleSideBar] = useState(true)
  const [toggleSideBarClass, setToggleSideBarClass] = useState('fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full')
  const { authUser } = useAuth()

  const router = useRouter()

  const handleLogout = () => {
    logoutWithEmail().then(() => {
      router.replace('/login')
      setToggleSideBar(false)
      setToggleSideBarClass('fixed top-0 left-0 z-40 w-64 h-screen transition-transform')
    })
  }

  const handleSideBarToggle = () => {
    if (!isNotificationOpen) {
      setToggleSideBar(prev => !prev)
      isOpen(toggleSideBar)
      if (toggleSideBar) setToggleSideBarClass('fixed top-0 left-0 z-40 w-64 h-screen transition-transform')
      if (!toggleSideBar) setToggleSideBarClass('fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full')
    }
  }

  const fullName = authUser?.displayName?.split('|')[0] ?? ''

  return (
    <div className='relative'>
      <aside id="sidebar-multi-level-sidebar" className={toggleSideBarClass} aria-label="Sidebar">
        <div className="h-full px-5 py-4 overflow-y-hidden bg-dark-green dark:bg-gray-800">
          <div className='flex flex-col w-full h-full'>

            <div className='grid w-full h-8 grid-rows-1'>
              <h2 className='justify-self-center self-start font-concert-one text-xl text-ligth-text-green'>Profile</h2>
              <div onClick={handleSideBarToggle} className='justify-self-end'>
                <CloseIcon fill='none' stroke='#EB6440' width={26} height={26}/>
              </div>
            </div>

            <div className='flex flex-col items-start pt-2'>
              <Avatar rounded={true} />
              <div className='flex flex-col items-center justify-center gap-1'>
                <h3 className='font-concert-one text-ligth-text-green text-xl'>{fullName}</h3>
                <Link href={'/profile'} className='font-karla text-ligth-text-green text-sm'>
                  View profile
                </Link>
              </div>
            </div>

            <div className='h-44 gap-2 flex flex-col justify-center'>
              <p className='font-karla text-ligth-text-green'>Friends</p>
              <p className='font-karla text-ligth-text-green'>Groups</p>
            </div>

            <div className='h-full pb-5 flex flex-col gap-2'>

              <div className='h-full flex items-end gap-2'>
                <SettingsIcon width={24} height={24} fill='none' stroke='#EB6440'/>
                <p className='text-ligth-text-green font-karla'>Settings</p>
              </div>

              <div className='flex items-end gap-2 pl-1 w-fit' onClick={handleLogout}>
                <LogoutIcon width={24} height={24} fill='none' stroke='#EB6440'/>
                <p className='text-ligth-text-green font-karla'>Logout</p>
              </div>

            </div>
          </div>
        </div>
      </aside>

      <div className='absolute z-10'>
        <Avatar rounded={true} onClick={handleSideBarToggle}/>
      </div>
    </div>
  )
}
