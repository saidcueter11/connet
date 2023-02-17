import { logoutWithEmail } from '@firebase/client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CloseIcon } from './Icons/CloseIcon'
import { Avatar } from 'flowbite-react'

export const SideBarProfile = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const [toggleSideBarClass, setToggleSideBarClass] = useState('fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0')

  const router = useRouter()

  const handleLogout = () => {
    logoutWithEmail().then(() => {
      router.replace('/login')
      setToggleSideBar(false)
      setToggleSideBarClass('fixed top-0 left-0 z-40 w-64 h-screen transition-transform')
    })
  }

  const handleSideBarToggle = () => {
    setToggleSideBar(prev => !prev)
    if (toggleSideBar) setToggleSideBarClass('fixed top-0 left-0 z-40 w-64 h-screen transition-transform')
    if (!toggleSideBar) setToggleSideBarClass('fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0')
  }

  return (
    <div className='relative'>
      <aside id="sidebar-multi-level-sidebar" className={toggleSideBarClass} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div onClick={handleSideBarToggle}>
            <CloseIcon fill='none' stroke='#EB6440' width={24} height={24}/>
            <br/>
            <br/>
            <br/>
            <br/>
            <p className='font-concert-one text-action-red' onClick={handleLogout}>Logout</p>
          </div>
        </div>
      </aside>

      <div className='absolute z-10'>
        <Avatar rounded={true} onClick={handleSideBarToggle}/>
      </div>
    </div>
  )
}
