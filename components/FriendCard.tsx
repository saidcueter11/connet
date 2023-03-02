import { Avatar } from 'flowbite-react'
import { addFriend, removeFriend } from '@firebase/client'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'
import { SlideCardIcons } from './SlideCardIcons'
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
          <SlideCardIcons friendsCount={friendsCount} likesCount={likesCount}/>
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
