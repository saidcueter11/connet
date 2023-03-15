import { useState } from 'react'
import { SideBarNotifications } from './SideBarNotifications'
import { SideBarProfile } from './SideBarProfile'

export const SideBarContainer = () => {
  const [toggleProfile, setToggleProfile] = useState(false)
  const [toggleNotifications, setToggleNotifications] = useState(false)
  return (
    <div className='z-10'>
      <SideBarProfile isNotificationOpen={toggleNotifications} toggle={toggleProfile} setToggle={setToggleProfile}/>
      <SideBarNotifications isProfileOpen={toggleProfile} toggle={toggleNotifications} setToggle={setToggleNotifications} />
    </div>
  )
}
