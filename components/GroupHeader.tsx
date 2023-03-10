import { Avatar } from 'flowbite-react'
import { MembersIcon } from './Icons/MembersIcon'
import { CreateIcon } from './Icons/CreateIcon'
import { JoinGroupIcon } from './Icons/JoinGroupIcon'
import { PostsModal } from './PostsModal'
import { useState } from 'react'
import { useAuth } from 'context/authUserContext'
import { LeaveGroupIcon } from './Icons/LeaveGroupIcon'
import { joinGroup, leaveGroup } from '@firebase/client'
import { useRouter } from 'next/router'

interface GroupHeaderProps {
  groupName?: string
  groupId?: string
  groupDescription?: string
  groupMembers?: string[]
  joinRequest?: string[]
  adminId?: string
}

export const GroupHeader = ({ groupName, groupId, groupDescription, groupMembers, joinRequest, adminId }: GroupHeaderProps) => {
  const auth = useAuth()
  const router = useRouter()
  const isAdmin = adminId === auth.authUser?.uid
  const isUserMember = groupMembers?.includes(auth.authUser?.uid as string)
  const [showModal, setShowModal] = useState(false)
  const [isMember, setIsMember] = useState(isUserMember)
  const [failPostPopout, setFailPostPopout] = useState(false)

  const handleJoinGroup = () => {
    joinGroup(groupId as string, auth.authUser?.uid as string)
    setIsMember(true)
  }

  const handleLeaveGroup = () => {
    leaveGroup(groupId as string, auth.authUser?.uid as string)
    setIsMember(false)
  }

  const handleCreatePost = () => {
    if (isMember) setShowModal(true)
    if (!isMember) {
      setFailPostPopout(true)
      setTimeout(() => {
        setFailPostPopout(false)
      }, 1500)
    }
  }

  const goToMembers = () => {
    const { asPath } = router
    router.push(`${asPath}/members`)
  }

  return (
    <>
      <div className={`absolute rounded-lg -bottom-20 p-4 bg-dark-green w-3/5 z-10 text-center font-karla text-ligth-text-green left-1/2 transform -translate-x-1/2 ${!failPostPopout ? 'translate-y-20' : '-translate-y-48'} transition-transform`}>
        <p>You must be a member of the group to create a post</p>
      </div>
      <div className='grid justify-items-center grid-rows-2 grid-cols-3 items-center'>
        <div className='self-end justify-self-end' >
          <button className={`rounded-full bg-dark-green h-12 w-12 row-start-1 row-end-1 self-end justify-self-end ${!isMember ? 'opacity-80' : ''}`} onClick={handleCreatePost}>
            <CreateIcon width={28} height={28} stroke='#FD8C77' fill='none'/>
          </button>
          <p className='font-concert-one text-text-dark-green text-center'>Post</p>
        </div>
        <div className='row-start-2 row-end-2 col-span-3 self-start'>
          <Avatar size={'lg'} rounded={true}/>
          <h1 className='justify-self-center font-concert-one text-xl text-text-dark-green text-center'>{groupName}</h1>
        </div>
        <div className='col-start-2 col-end-2 flex flex-col items-center justify-center'>
          <button className='rounded-full bg-dark-green h-12 w-12 col-start-2 col-end-2 relative' onClick={goToMembers}>
            <MembersIcon width={26} height={26} stroke='#FD8C77' fill='none' id={groupId}/>
            {
              joinRequest && joinRequest?.length > 0 && isAdmin &&
                <div className='absolute -right-2 -top-2 rounded-full bg-action-red text-ligth-text-green font-karla w-6 h-6'>
                  <span>{joinRequest?.length}</span>
                </div>
            }
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
          <p className='font-concert-one text-text-dark-green text-center'>{isMember ? 'Leave' : 'Join'}</p>
        </div>
      </div>

      <p className='text-center mt-2 font-karla'>{groupDescription}</p>

      {
        typeof window !== 'undefined' && <PostsModal groupId={groupId} showModal={showModal} setShowModal={setShowModal}/>
      }
    </>
  )
}
