import { Avatar } from 'flowbite-react'
import Link from 'next/link'
import { MembersIcon } from './Icons/MembersIcon'
import { CreateIcon } from './Icons/CreateIcon'
import { JoinGroupIcon } from './Icons/JoinGroupIcon'
import { PostsModal } from './PostsModal'
import { useState } from 'react'
import { useAuth } from 'context/authUserContext'
import { LeaveGroupIcon } from './Icons/LeaveGroupIcon'
import { joinGroup, leaveGroup } from '@firebase/client'

interface GroupHeaderProps {
  groupName: string
  groupId?: string
  loading?: boolean
  groupDescription?: string
  groupMembers?: string[]
}

export const GroupHeader = ({ groupName, groupId, loading, groupDescription, groupMembers }: GroupHeaderProps) => {
  const auth = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [isMember, setIsMember] = useState(groupMembers?.includes(auth.authUser?.uid as string))

  const handleJoinGroup = () => {
    joinGroup(groupId as string, auth.authUser?.uid as string)
    setIsMember(true)
  }

  const handleLeaveGroup = () => {
    leaveGroup(groupId as string, auth.authUser?.uid as string)
    setIsMember(false)
  }

  return (
    <>
      <div className='grid justify-items-center grid-rows-2 grid-cols-3 items-center'>
        <div className='self-end justify-self-end' onClick={() => setShowModal(true)}>
          <button className='rounded-full bg-dark-green h-12 w-12 row-start-1 row-end-1 self-end justify-self-end'>
            <CreateIcon width={28} height={28} stroke='#FD8C77' fill='none'/>
          </button>
          <p className='font-concert-one text-text-dark-green text-center'>Post</p>
        </div>
        <Link href={`/profile/${groupId}`} className='row-start-2 row-end-2 col-span-3 self-start'>
          <Avatar size={'lg'} rounded={true}/>
          {
            loading
              ? <h1 className='justify-self-center font-concert-one text-xl text-text-dark-green'></h1>
              : <h1 className='justify-self-center font-concert-one text-xl text-text-dark-green text-center'>{groupName}</h1>
          }
        </Link>
        <div className='col-start-2 col-end-2 flex flex-col items-center justify-center'>
          <button className='rounded-full bg-dark-green h-12 w-12 col-start-2 col-end-2'>
            <MembersIcon width={26} height={26} stroke='#FD8C77' fill='none' id={groupId}/>
          </button>
          <p className='font-concert-one text-text-dark-green'>Members</p>
        </div>
        <div className='flex flex-col items-center row-start-1 row-end-1 col-start-3 col-end-3 self-end justify-self-start'>
          <button className='rounded-full bg-dark-green h-12 w-12'>
            {
              isMember
                ? <div onClick={handleLeaveGroup}><LeaveGroupIcon width={28} height={28} stroke='#FD8C77' fill='none'/></div>
                : <div onClick={handleJoinGroup}><JoinGroupIcon width={28} height={28} stroke='#FD8C77' fill='none' /></div>
            }
          </button>
          <p className='font-concert-one text-text-dark-green text-center'>
            {
              isMember
                ? 'Leave'
                : 'Join'
            }
          </p>
        </div>
      </div>

      <p className='text-center mt-2 font-karla'>{groupDescription}</p>

      {
        typeof window !== 'undefined' && <PostsModal groupId={'FSz8VARaJdWLv9njKipL'} showModal={showModal} setShowModal={setShowModal}/>
      }
    </>
  )
}
