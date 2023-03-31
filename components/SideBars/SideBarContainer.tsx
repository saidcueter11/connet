import { useState } from 'react'
import { SideBarNotifications } from './SideBarNotifications'
import { SideBarProfile } from './SideBarProfile'
import { useRouter } from 'next/router'

export const SideBarContainer = () => {
  const [toggleProfile, setToggleProfile] = useState(false)
  const [toggleNotifications, setToggleNotifications] = useState(false)
  const router = useRouter()
  const path = router.route.split('/')[1]
  const atPost = path === 'post'
  const atProfile = path === 'profile'
  const atGroup = path === 'group'
  const atSetting = path === 'setting'
  return (
    <>
      {
        (!atPost && !atProfile && !atGroup && !atSetting) &&
          <div className='z-10 md:hidden'>
            <SideBarProfile isNotificationOpen={toggleNotifications} toggle={toggleProfile} setToggle={setToggleProfile}/>
            <SideBarNotifications isProfileOpen={toggleProfile} toggle={toggleNotifications} setToggle={setToggleNotifications} />
          </div>
      }
    </>
  )
}
