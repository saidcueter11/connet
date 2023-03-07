import { Avatar } from 'flowbite-react'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'
import { SlideCardIcons } from './SlideCardIcons'
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
      <div className='flex flex-col h-full items-center justify-center gap-2 p-6'>
        <div onClick={goToProfile}>
          <Avatar rounded={true} size={'lg'}/>
          <h2 className='font-concert-one text-xl text-ligth-text-green'>{displayName} {userId === auth.authUser?.uid && '(You)'}</h2>
        </div>

        <div className='flex gap-2'>
          <SlideCardIcons friendsCount={friendsCount} likesCount={likesCount}/>
        </div>

        {
          auth.authUser?.uid !== userId &&
            <div className='flex gap-4'>
              {
                (!isMember) &&
                  <>
                    <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one' onClick={handleAcceptRequest}>Accept Request</button>
                    <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one' onClick={handleDeclineRequest}>Decline Request</button>
                  </>
              }

              {
                isAdmin
                  ? <>
                      <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one' onClick={handleRemoveMember}>Remove Member</button>
                      <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one' onClick={goToProfile}>View Profile</button>
                    </>
                  : <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one' onClick={goToProfile}>View Profile</button>
              }
            </div>
        }

      </div>
    </>
  )
}
