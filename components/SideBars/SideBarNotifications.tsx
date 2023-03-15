import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CloseIcon } from '../Icons/CloseIcon'
import { NotificationIcon } from 'components/Icons/NotificationIcon'
import { collection, doc } from 'firebase/firestore'
import { db } from '@firebase/client'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useAuth } from 'context/authUserContext'
import { UserCollection } from 'types/databaseTypes'

interface SideBarNotificationsPros {
  isProfileOpen?: boolean
  toggle: boolean
  setToggle: Dispatch<SetStateAction<boolean>>
}

export const SideBarNotifications = ({ isProfileOpen, toggle, setToggle }: SideBarNotificationsPros) => {
  const { authUser } = useAuth()
  const [toggleSideBarClass, setToggleSideBarClass] = useState('fixed top-0 right-0 z-40 w-64 h-screen transition-transform translate-x-full ')
  const collectionUser = collection(db, 'users')
  const docRef = authUser && doc(collectionUser, authUser?.uid)
  const [user, setUser] = useState<UserCollection>()
  const [value, loading, error] = useDocument(docRef)

  if (error) return <p>There was an error</p>

  useEffect(() => {
    if (!loading) {
      const snap: UserCollection = value?.data() as UserCollection
      setUser(snap)
    }
  }, [loading, authUser])

  const handleSideBarToggle = () => {
    if (!isProfileOpen) {
      setToggle(prev => !prev)
      if (!toggle) setToggleSideBarClass('fixed top-0 right-0 z-40 w-64 h-screen transition-transform')
      if (toggle) setToggleSideBarClass('fixed top-0 right-0 z-40 w-64 h-screen transition-transform translate-x-full ')
    }
  }

  const notifications = user?.notifications
  console.log({ notifications })

  return (
    <>
      <div className='relative'>
        <aside id="sidebar-multi-level-sidebar" className={toggleSideBarClass} aria-label="Sidebar">
          <div className="h-full px-5 py-4 overflow-y-hidden bg-dark-green dark:bg-gray-800">
            <div className='flex flex-col w-full h-full'>

              <div className='grid w-full h-8 grid-rows-1'>
                <div onClick={handleSideBarToggle} className='justify-self-start pt-2'>
                  <CloseIcon fill='none' stroke='#FD8C77' width={26} height={26}/>
                </div>
                <h2 className='justify-self-center font-concert-one text-xl text-ligth-text-green'>Notifications</h2>
              </div>

              {
                notifications && notifications.map((notification, index) => {
                  console.log(notification)
                  if (notification.messages) {
                    return <p key={index}>{notification.messages.senderName}</p>
                  }
                  return ''
                })
              }

            </div>
          </div>
        </aside>

        <div onClick={handleSideBarToggle} className='absolute z-10 bg-dark-green rounded-full p-1.5 right-0'>
          <NotificationIcon width={28} height={28} stroke='#FD8C77' fill='none'/>
        </div>
      </div>

    </>
  )
}
