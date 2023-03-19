import { logoutWithEmail } from '@firebase/client'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import { CloseIcon } from '../Icons/CloseIcon'
import { Avatar } from 'flowbite-react'
import { SettingsIcon } from '../Icons/SettingsIcon'
import { LogoutIcon } from '../Icons/LogoutIcon'
import { useAuth } from 'context/authUserContext'
import Link from 'next/link'
import { FriendsIcon } from '../Icons/FriendsIcon'
import { GroupIcon } from '../Icons/GroupsIcon'

interface SideBarProfileProps {
  toggle: boolean
  setToggle: Dispatch<SetStateAction<boolean>>
  isNotificationOpen: boolean
}

export const SideBarProfile = ({ toggle, setToggle, isNotificationOpen }: SideBarProfileProps) => {
  const [toggleSideBarClass, setToggleSideBarClass] = useState('fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full')
  const { authUser } = useAuth()

  const router = useRouter()

  const handleLogout = () => {
    logoutWithEmail().then(() => {
      router.replace('/login')
      setToggle(false)
      setToggleSideBarClass('fixed top-0 left-0 z-40 w-64 h-screen transition-transform')
    })
  }

  const handleSideBarToggle = () => {
    if (!isNotificationOpen) {
      setToggle(prev => !prev)
      if (!toggle) setToggleSideBarClass('fixed top-0 left-0 z-40 w-64 h-screen transition-transform')
      if (toggle) setToggleSideBarClass('fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full')
    }
  }

  const fullName = authUser?.displayName?.split('|')[0] ?? ''

  return (
    <>
      <div className='relative'>
        <aside id="sidebar-multi-level-sidebar" className={toggleSideBarClass} aria-label="Sidebar">
          <div className="h-full px-5 py-4 overflow-y-hidden bg-dark-green dark:bg-gray-800">
            <div className='flex flex-col w-full h-full relative'>

              <div className='grid w-full h-8 grid-rows-1'>
                <h2 className='justify-self-center self-start font-concert-one text-xl text-ligth-text-green'>Profile</h2>
                <div onClick={handleSideBarToggle} className='justify-self-end'>
                  <CloseIcon fill='none' stroke='#FD8C77' width={26} height={26}/>
                </div>
              </div>

              <div className='flex flex-col items-start pt-2'>
                <Avatar rounded={true} img={authUser?.photoURL ?? ''} className='avatar-img'/>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <h3 className='font-concert-one text-ligth-text-green text-xl'>{fullName}</h3>
                  <Link href={`/profile/${authUser?.uid}`} className='font-karla text-ligth-text-green text-sm'>View profile</Link>
                </div>
              </div>

              <div className='mt-5 gap-4 flex flex-col justify-center'>
                <Link href={`/friends/${authUser?.uid}`} className='font-karla text-ligth-text-green flex gap-2'>
                  <FriendsIcon width={24} height={24} fill='none' stroke='#FD8C77'/>
                  <p>Friends</p>
                </Link>
                <Link href={`/groups/${authUser?.uid}`} className='font-karla text-ligth-text-green flex gap-2'>
                  <GroupIcon width={24} height={24} fill='none' stroke='#FD8C77'/>
                  <p>Groups</p>
                </Link>
                <Link href={'/setting'} className='flex items-end gap-2'>
                  <SettingsIcon width={24} height={24} fill='none' stroke='#FD8C77'/>
                  <p className='text-ligth-text-green font-karla'>Settings</p>
                </Link>

                <div className='flex items-end gap-2 w-fit' onClick={handleLogout}>
                  <LogoutIcon width={24} height={24} fill='none' stroke='#FD8C77'/>
                  <p className='text-ligth-text-green font-karla'>Logout</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className='absolute z-10'>
          <Avatar rounded={true} onClick={handleSideBarToggle} img={authUser?.photoURL ?? ''} className='avatar-img'/>
        </div>

      </div>

    </>
  )
}
