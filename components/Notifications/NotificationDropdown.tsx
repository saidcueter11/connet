import { db, updateNotificationsStatus } from '@firebase/client'
import { NotificationIcon } from 'components/Icons/NotificationIcon'
import { useAuth } from 'context/authUserContext'
import { collection, doc } from 'firebase/firestore'
import { Dropdown } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { NotificationType, UserCollection } from 'types/databaseTypes'
import { NotificationCard } from './NotificationCard'

export const NotificationDropdown = () => {
  const { authUser } = useAuth()
  const collectionUser = collection(db, 'users')
  const docRef = authUser && doc(collectionUser, authUser?.uid)
  const [user, setUser] = useState<UserCollection>()
  const [value, loading, error] = useDocument(docRef)

  if (error) return <p>There was an error</p>

  useEffect(() => {
    if (!loading) {
      const snap: UserCollection = value?.data() as UserCollection
      snap && snap.notifications?.reverse()
      setUser(snap)
    }
  }, [loading, authUser, value])

  const handleUpdateNotifications = () => {
    updateNotificationsStatus(authUser?.uid as string)
  }

  const notifications = user?.notifications as NotificationType[]
  const chats: string[] = []
  const totalNotificationsUnread = notifications && notifications.filter(not => not.commentedPost?.status === 'unread' || not.friendAdded?.status === 'unread' || not.likedPost?.status === 'unread' || not.messages?.status === 'unread').length

  return (
    <>
      <Dropdown label={
          <div className={'relative flex-col flex items-center cursor-pointer'} onClick={handleUpdateNotifications}>
            <NotificationIcon width={26} height={26} fill='none' stroke='#FD8C77'/>
            <p className='text-sm text-ligth-text-green font-karla font-bold'>Notifications</p>
              {
                user?.notificationStatus === 'unread' &&
                  <div className='absolute right-6 -top-2 rounded-full text-sm bg-action-red text-center h-5 w-5 text-ligth-text-green font-karla flex items-center justify-center'>
                    <span>{totalNotificationsUnread}</span>
                  </div>
              }
          </div>
        } color={''} arrowIcon={false} inline={true} className='max-h-80 overflow-y-scroll'>
          {
            notifications && notifications.map((notification, index) => {
              if (notification.messages && !chats.includes(notification.messages.chatId)) {
                chats.push(notification.messages.chatId)
                return <Dropdown.Item className='cursor-default' key={index}><NotificationCard notification={notification} /></Dropdown.Item>
              }

              if (!notification.messages) {
                return <Dropdown.Item className='cursor-default' key={index}><NotificationCard notification={notification} /></Dropdown.Item>
              }
              return null
            })
          }
        </Dropdown>
    </>
  )
}
