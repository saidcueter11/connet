import { Avatar } from 'flowbite-react'
import { SlideCardIcons } from './SlideCardIcons'
import { useAuth } from 'context/authUserContext'
import { joinGroup, leaveGroup } from '@firebase/client'

interface GroupCardProps {
  groupName: string
  membersCount: number
  likesCount: number
  adminId: string
  groupId: string
  groupMembers: string[]
}

export const GroupCard = ({ groupName, membersCount, likesCount, adminId, groupId, groupMembers }: GroupCardProps) => {
  const { authUser } = useAuth()
  const isAdmin = authUser?.uid === adminId
  const isMember = groupMembers.includes(authUser?.uid as string)

  const handleJoinGroup = () => {
    joinGroup(groupId, authUser?.uid as string)
  }

  const handleLeaveGroup = () => {
    leaveGroup(groupId, authUser?.uid as string)
  }
  return (
    <>
      <div className='flex flex-col h-full items-center justify-center gap-2 p-6'>
        <div>
          <Avatar rounded={true} size={'lg'}/>
          <h2 className='font-concert-one text-xl text-ligth-text-green'>{groupName}</h2>
        </div>

        <div className='flex gap-2'>
          <SlideCardIcons friendsCount={membersCount} likesCount={likesCount}/>
        </div>

        {
          isAdmin && <button className='bg-light-green text-text-dark-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one h-9 w-28'>Delete Group</button>
        }

        {
          (!isAdmin && !isMember) && <button onClick={handleJoinGroup} className='bg-light-green text-text-dark-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one h-9 w-28'>Join Group</button>
        }

        {
          (isMember && !isAdmin) && <button onClick={handleLeaveGroup} className='bg-light-green text-text-dark-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one h-9 w-28'>Leave Group</button>
        }
      </div>
    </>
  )
}
