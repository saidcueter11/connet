import { Avatar, Modal } from 'flowbite-react'
import { SlideCardIcons } from './SlideCardIcons'
import { useAuth } from 'context/authUserContext'
import { cancelJoinRequest, deleteGroup, joinGroup, joinRequestGroup, leaveGroup } from '@firebase/client'
import { useState } from 'react'

interface GroupCardProps {
  groupName: string
  membersCount: number
  likesCount: number
  adminId: string
  groupId: string
  groupMembers: string[]
  privacy: string
  joinRequests: string[]
}

export const GroupCard = ({ groupName, membersCount, likesCount, adminId, groupId, groupMembers, privacy, joinRequests }: GroupCardProps) => {
  const { authUser } = useAuth()
  const isAdmin = authUser?.uid === adminId
  const isMember = groupMembers.includes(authUser?.uid as string)
  const [showModal, setShowModal] = useState(false)
  const isPrivate = privacy === 'Private'
  const isRequestSent = joinRequests ? joinRequests.includes(authUser?.uid as string) : false
  console.log({ joinRequests })

  const handleJoinGroup = () => {
    joinGroup(groupId, authUser?.uid as string)
  }

  const handleLeaveGroup = () => {
    leaveGroup(groupId, authUser?.uid as string)
  }

  const handleDeleteGroup = () => {
    deleteGroup(groupId)
  }

  const handleJoinRequest = () => {
    joinRequestGroup(groupId, authUser?.uid as string)
  }

  const handleCancelJoinRequest = () => {
    cancelJoinRequest(groupId, authUser?.uid as string)
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
          isAdmin && <button onClick={() => setShowModal(true)} className='bg-light-green text-text-dark-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one h-9 w-28'>Delete Group</button>
        }

        {
          (!isAdmin && !isMember && !isPrivate) && <button onClick={handleJoinGroup} className='bg-light-green text-text-dark-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one h-9 w-28'>Join Group</button>
        }

        {
          (isMember && !isAdmin) && <button onClick={handleLeaveGroup} className='bg-light-green text-text-dark-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one h-9 w-28'>Leave Group</button>
        }

        {
          (!isMember && isPrivate && !isRequestSent) && <button onClick={handleJoinRequest} className='bg-light-green text-text-dark-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one'>Request to join Group</button>
        }

        {
          (isRequestSent) &&
            <div className='flex flex-col items-center gap-2'>
              <p className='font-karla text-ligth-text-green'>Waiting for admin response</p>
              <button className='bg-light-green text-text-dark-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one' onClick={handleCancelJoinRequest}>Cancel Request</button>
            </div>
        }
      </div>

      <Modal
        show={showModal}
        size="md"
      >

        <Modal.Body>
          <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this group?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              color="failure"
              onClick={handleDeleteGroup}
            >
              Yes, I am sure
            </button>
            <button
              color="gray"
              onClick={() => setShowModal(false)}
            >
              No, cancel
            </button>
          </div>
        </div>
        </Modal.Body>

      </Modal>
    </>
  )
}