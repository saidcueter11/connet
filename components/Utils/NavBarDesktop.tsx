import { db } from '@firebase/client'
import { Dot } from 'components/Icons/Dot'
import { FriendsIcon } from 'components/Icons/FriendsIcon'
import { HomeIcon } from 'components/Icons/HomeIcon'
import { MessagesIcon } from 'components/Icons/MessagesIcon'
import { NotificationIcon } from 'components/Icons/NotificationIcon'
import { useAuth } from 'context/authUserContext'
import { collection } from 'firebase/firestore'
import { Dropdown } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { MessageCollection } from 'types/databaseTypes'

interface NavBarDesktopProps {
  search?: string
  setSearch?: (search: string) => void
}

export const NavBarDesktop = ({ search, setSearch }:NavBarDesktopProps) => {
  const auth = useAuth()
  const router = useRouter()
  const path = router.route.split('/')[1]
  const atFriends = path === 'friends'
  const atMessages = path === 'messages'
  const atHome = path !== 'friends' && path !== 'messages'
  const [newMessages, setNewMessages] = useState(false)

  const collectionMessages = collection(db, 'messages')
  const [value, loading, error] = useCollection(collectionMessages)

  useEffect(() => {
    if (!loading && !error) {
      const messages = value?.docs.map(doc => doc.data()) as MessageCollection[]
      const currentUserMessages = messages.filter(m => m.receiverUser.id === auth.authUser?.uid || m.senderUser === auth.authUser?.uid)

      const isMessagesPending = currentUserMessages.some(m => m.messages.find(p => p.status === 'unread' && p.userId !== auth.authUser?.uid))

      setNewMessages(isMessagesPending)
    }
  }, [value, loading])

  return (
    <nav className='bg-dark-green shadow-md fixed top-0 w-full left-0 hidden md:flex justify-between p-2 z-20'>
      <ul className="flex w-full gap-7 pl-7 items-center max-w-4xl mx-auto">
        <Link href={'/'}>
          <li className={`relative flex-col flex items-center cursor-pointer ${atHome ? 'border-b-2 border-action-red-ligth' : ''}`}>
            <HomeIcon width={26} height={26} fill='none' stroke='#FD8C77'/>
            <p className='text-sm text-ligth-text-green font-karla font-bold'>Home</p>
          </li>
        </Link>

        <Link href={`/messages/${auth.authUser?.uid}`}>
          <li className={`relative flex-col flex items-center cursor-pointer ${atMessages ? 'border-b-2 border-action-red-ligth' : ''}`}>
            <MessagesIcon width={26} height={26} fill='none' stroke='#FD8C77' id={auth.authUser?.uid as string}/>
            {
              newMessages &&
                <div className='absolute -top-2 right-2'>
                  <Dot width={26} height={26} fill='#D6E4E5' />
                </div>
            }
            <p className='text-sm text-ligth-text-green font-karla font-bold'>Messages</p>
          </li>
        </Link>

        <Link href={`/friends/${auth.authUser?.uid}`}>
          <li className={`relative flex-col flex items-center cursor-pointer ${atFriends ? 'border-b-2 border-action-red-ligth' : ''}`}>
            <FriendsIcon width={26} height={26} fill='none' stroke='#FD8C77' id={auth.authUser?.uid}/>
            <p className='text-sm text-ligth-text-green font-karla font-bold'>Friends</p>
          </li>
        </Link>

        <Dropdown label={
          <li className={'relative flex-col flex items-center cursor-pointer'}>
            <NotificationIcon width={26} height={26} fill='none' stroke='#FD8C77'/>
            <p className='text-sm text-ligth-text-green font-karla font-bold'>Notifications</p>
          </li>
        } color={''} arrowIcon={false} inline={true}>

        </Dropdown>

        <input className='rounded-3xl w-[380px] shadow px-3 py-1 font-karla outline-dark-green text-center ml-3 h-fit bg-light-green' placeholder="Search posts" value={search} onChange={(e) => setSearch && setSearch(e.target.value)}/>

      </ul>
    </nav>
  )
}
