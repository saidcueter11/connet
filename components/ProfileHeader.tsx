import { Avatar } from 'flowbite-react'
import { FriendsIcon } from './Icons/FriendsIcon'
import { GroupIcon } from './Icons/GroupsIcon'
import { SendIcon } from './Icons/SendIcon'
import Link from 'next/link'

interface ProfileHeaderProps {
  displayName: string
  userId?: string
  loading?: boolean
}

export const ProfileHeader = ({ displayName, userId, loading }: ProfileHeaderProps) => {
  return (
    <>
        <div className='grid justify-items-center grid-rows-2 grid-cols-3 items-center'>
          <button className='rounded-full bg-dark-green h-12 w-12 row-start-1 row-end-1 self-end justify-self-end'>
            <GroupIcon width={28} height={28} stroke='#FD8C77' fill='none'/>
          </button>
          <Link href={`/profile/${userId}`} className='row-start-2 row-end-2 col-span-3 self-start'>
            <Avatar size={'lg'} rounded={true}/>
            {
              loading
                ? <h1 className='justify-self-center font-concert-one text-xl text-text-dark-green'></h1>
                : <h1 className='justify-self-center font-concert-one text-xl text-text-dark-green'>{displayName}</h1>
            }
          </Link>
          <button className='rounded-full bg-dark-green h-12 w-12 col-start-2 col-end-2'>
            <FriendsIcon width={26} height={26} stroke='#FD8C77' fill='none'/>
          </button>
          <button className='rounded-full bg-dark-green h-12 w-12 row-start-1 row-end-1 col-start-3 col-end-3 self-end justify-self-start'>
            <SendIcon width={28} height={28} stroke='#FD8C77' fill='none' />
          </button>
        </div>
    </>
  )
}
