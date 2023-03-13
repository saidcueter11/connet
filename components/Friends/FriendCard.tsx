import { Avatar } from 'flowbite-react'
import { addFriend, removeFriend } from '@firebase/client'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'
import { SlideCardIcons } from '../Utils/SlideCardIcons'
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
      <div className='flex bg-dark-green rounded-lg p-3 justify-between min-w-[320px] w-full'>
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
              <button onClick={handleAddFriend} className='w-28 bg-light-green rounded-full pb-2 px-2 h-fit text-sm font-concert-one'>{areWeFriends ? 'Remove friend' : 'Add friend'}</button>
          }

        </div>

      </div>
    </>
  )
}
