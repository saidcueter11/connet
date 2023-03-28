import { db } from '@firebase/client'
import { LogoutIcon } from 'components/Icons/LogoutIcon'
import { SettingsIcon } from 'components/Icons/SettingsIcon'
import { useAuth } from 'context/authUserContext'
import { collection } from 'firebase/firestore'
import { Avatar } from 'flowbite-react'
import Link from 'next/link'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { GroupCollecion, UserCollection } from 'types/databaseTypes'

export const SideMenuDesktop = () => {
  const auth = useAuth()
  const collectionRef = collection(db, 'users')
  const collectionRefGroups = collection(db, 'groups')
  const [value] = useCollectionOnce<UserCollection>(collectionRef)
  const [groupsValue] = useCollectionOnce<GroupCollecion>(collectionRefGroups)

  const handleLogout = () => auth.logout()

  const users = value?.docs.map(doc => {
    const data = doc.data()
    const { id } = doc
    return { ...data, id }
  })

  const groups = groupsValue?.docs.map(doc => {
    const data = doc.data()
    const { id } = doc
    return { ...data, id }
  })

  const currentUser = users?.find(user => user.id === auth.authUser?.uid)
  const listofFriends = users?.filter(user => currentUser?.friends?.includes(user.id)).slice(0, 4)
  const listofGroups = groups?.filter(group => group.groupMembers?.includes(auth.authUser?.uid as string))

  return (
    <aside className='hidden md:block col-span-3 mt-16 h-fit max-w-[280px] min-w-[280px] justify-self-end'>
      <div className='bg-dark-green rounded-lg px-2 min-h-[280px]'>
        <div className='p-2 flex flex-col items-center gap-1'>
          <Link href={`/profile/${auth.authUser?.uid}`}>
            <Avatar size={'lg'} rounded={true} img={auth.authUser?.photoURL ?? ''} className='avatar-img'/>
          </Link>
          <Link href={`/profile/${auth.authUser?.uid}`} className='font-concert-one text-ligth-text-green text-lg block hover:underline'>{auth.authUser?.displayName?.split('|')[0]}</Link>
          <p className='font-karla text-ligth-text-green text-sm min-h-[20px]'>{currentUser && currentUser?.program}</p>
        </div>

        <div>
          <div className='flex justify-between px-4'>
            <p className='font-karla text-ligth-text-green'>Friends</p>
            <p className='font-karla text-ligth-text-green'>{currentUser && currentUser?.friendsCount}</p>
          </div>

          <div className='flex justify-between px-4'>
            <p className='font-karla text-ligth-text-green'>Likes</p>
            <p className='font-karla text-ligth-text-green'>{currentUser && currentUser?.likesCount}</p>
          </div>

          <div className='px-2 py-4 font-karla text-ligth-text-green flex flex-col items-start gap-1'>
            <Link href={`/setting/${auth.authUser?.uid}`} className='flex items-end gap-2 w-fit'>
              <SettingsIcon width={20} height={20} fill='none' stroke='#FD8C77'/>
              <span className='text-ligth-text-green font-karla text-sm'>Settings</span>
            </Link>

            <button onClick={handleLogout} className='flex items-end gap-2 w-fit pl-0.5'>
              <LogoutIcon width={20} height={20} fill='none' stroke='#FD8C77'/>
              <span className='text-ligth-text-green font-karla text-sm'>Logout</span>
            </button>
          </div>

        </div>
      </div>

      <div className='bg-dark-green rounded-lg mt-3 p-4 min-h-[228px]'>
        <div className='grid justify-start gap-2 min-h-[160px]'>
          {
            listofFriends && listofFriends.map(user => (
              <Avatar rounded={true} key={user.id} img={user.avatar} className='avatar-img justify-self-start'>
                <Link href={`/profile/${user.id}`} className='font-concert-one text-ligth-text-green hover:underline block'>{user.firstName} {user.lastName}</Link>
                <Link href={`/profile/${user.id}`} className='text-xs font-karla font-bold bg-light-green rounded-full px-3 py-0.5 hover:opacity-75 transition-opacity'>View profile</Link>
              </Avatar>
            ))
          }
        </div>

        <Link href={`/friends/${auth.authUser?.uid}`} className='block mt-3 text-xs font-karla font-bold bg-light-green rounded-full py-0.5 w-full text-center hover:opacity-75 transition-opacity'>Go to friends</Link>
      </div>

      <div className='bg-dark-green rounded-lg mt-3 p-4 min-h-[228px]'>
        <div className='grid justify-start gap-2 min-h-[160px]'>
          {
            listofGroups && listofGroups.map(group => (
              <Avatar rounded={true} key={group.id}>
                <Link href={`/group/${group.id}`} className='font-concert-one text-ligth-text-green hover:underline block'>{group.groupName}</Link>
                <Link href={`/group/${group.id}`} className='text-xs font-karla font-bold bg-light-green rounded-full px-3 py-0.5 hover:opacity-75 transition-opacity'>View group</Link>
              </Avatar>
            ))
          }
        </div>

        <Link href={`/groups/${auth.authUser?.uid}`} className='block text-xs bg-light-green rounded-full py-0.5 w-full self-center mt-3 text-center font-karla font-bold hover:opacity-75 transition-opacity'>Go to groups</Link>
      </div>
    </aside>
  )
}
