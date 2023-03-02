import { Avatar } from 'flowbite-react'
import { FriendsIcon } from './Icons/FriendsIcon'
import Like from './Icons/Like'
import { addFriend, removeFriend } from '@firebase/client'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'
interface FriendCardProps {
  displayName: string,
  likesCount: number,
  friendsCount: number,
  areWeFriends?: boolean,
  avatar?: string
  userId?: string
}

export const FriendCard = ({ userId, displayName, likesCount, friendsCount, areWeFriends }: FriendCardProps) => {
  const auth = useAuth()
  const router = useRouter()

  const handleAddFriend = () => {
    !areWeFriends && addFriend({
      id: auth.authUser?.uid,
      friendId: userId
    })

    areWeFriends && removeFriend({
      id: auth.authUser?.uid,
      friendId: userId
    })
  }

  const goToProfile = () => router.push(`/profile/${userId}`)

  return (
    <>
      <div className='flex flex-col h-full items-center justify-center gap-2 p-6'>
        <div onClick={goToProfile}>
          <Avatar rounded={true} size={'lg'}/>
          <h2 className='font-concert-one text-xl text-ligth-text-green'>{displayName} {userId === auth.authUser?.uid && '(You)'}</h2>
        </div>

        <div className='flex gap-2'>

          <div >
            <div className='rounded-full bg-light-green p-2'>
              <FriendsIcon width={30} height={30} stroke='#FD8C77' fill='none'/>
            </div>
            <p className='text-center font-concert-one text-ligth-text-green'>{friendsCount}</p>
          </div>

          <div>
            <div className='rounded-full bg-light-green p-2'>
              <Like width={30} height={30} stroke='#FD8C77' fill='none'/>
            </div>
            <p className='text-center font-concert-one text-ligth-text-green'>{likesCount}</p>
          </div>

        </div>

        {
          auth.authUser?.uid !== userId &&
            <div className='flex gap-4'>
              <button onClick={handleAddFriend} className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one min-h-[48px] min-w-[125px]'>{areWeFriends ? 'Remove from friend' : 'Add friend'}</button>
              <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one'>Send direct message</button>
            </div>
        }

      </div>

    </>
  )
}
