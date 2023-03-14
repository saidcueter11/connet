import { Avatar } from 'flowbite-react'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'
import { SlideCardIcons } from '../Utils/SlideCardIcons'
import { acceptJoinRequestGroup, declineJoinRequestGroup, removeGroupMember } from '@firebase/client'
interface MembersCardProps {
  displayName: string,
  likesCount: number,
  friendsCount: number,
  isMember?: boolean,
  avatar?: string,
  userId?: string,
  groupId?: string,
  isAdmin?: boolean
}

export const MembersCard = ({ userId, displayName, likesCount, friendsCount, isMember, groupId, isAdmin }: MembersCardProps) => {
  const auth = useAuth()
  const router = useRouter()

  const goToProfile = () => router.push(`/profile/${userId}`)

  const handleAcceptRequest = () => {
    acceptJoinRequestGroup(groupId as string, userId as string)
  }

  const handleRemoveMember = () => {
    removeGroupMember(groupId as string, userId as string)
  }

  const handleDeclineRequest = () => {
    declineJoinRequestGroup(groupId as string, userId as string)
  }

  return (
    <>
      <div className='flex bg-dark-green rounded-lg p-3 justify-between min-w-[320px]'>
        <div onClick={goToProfile}>
          <Avatar rounded={true}>
            <p className='text-ligth-text-green mb-1'>{displayName} {userId === auth.authUser?.uid && '(You)'}</p>
            <div className='flex gap-2'>
              <SlideCardIcons friendsCount={friendsCount} likesCount={likesCount}/>
            </div>
          </Avatar>
        </div>

        <div className='flex flex-col justify-center items-center gap-2'>
        {
          auth.authUser?.uid !== userId &&
            <div className='flex gap-4'>
              {
                (!isMember) &&
                  <div className='flex flex-col gap-2'>
                    <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one' onClick={handleAcceptRequest}>Accept Request</button>
                    <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one' onClick={handleDeclineRequest}>Decline Request</button>
                  </div>
              }

              {
                isAdmin &&
                  <div className='flex flex-col gap-2'>
                    <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one' onClick={handleRemoveMember}>Remove Member</button>
                    <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one' onClick={goToProfile}>View Profile</button>
                  </div>
              }

              {

              }
            </div>
        }

        </div>

      </div>
    </>
  )
}
