import { Avatar, Spinner } from 'flowbite-react'
import { addFriend, friendAddedNotification, removeFriend } from '@firebase/client'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'
import { SlideCardIcons } from '../Utils/SlideCardIcons'
import { useState } from 'react'
interface FriendCardProps {
  displayName: string,
  likesCount: number,
  friendsCount: number,
  areWeFriends?: boolean,
  avatar?: string
  userId?: string
}

export const FriendCard = ({ userId, displayName, likesCount, friendsCount, areWeFriends, avatar }: FriendCardProps) => {
  const { authUser } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleAddFriend = () => {
    setLoading(false)
    if (!areWeFriends) {
      addFriend({
        id: authUser?.uid,
        friendId: userId
      }).then(() => {
        authUser?.uid !== userId && friendAddedNotification({
          avatar: authUser?.photoURL ?? '',
          friendId: authUser?.uid as string,
          fullname: authUser?.displayName?.split('|')[0] as string,
          userId: userId as string
        })
      })
    }

    if (areWeFriends) {
      removeFriend({
        id: authUser?.uid,
        friendId: userId
      })
    }
  }

  const goToProfile = () => router.push(`/profile/${userId}`)

  return (
    <>
      <div className='flex bg-dark-green rounded-lg p-3 justify-between min-w-[320px] w-full'>
        <div onClick={goToProfile} className='pr-3'>
          <Avatar rounded={true} img={avatar} className='avatar-img'>
            <p className='text-ligth-text-green mb-1'>{displayName} {userId === authUser?.uid && '(You)'}</p>
            <div className='flex gap-2'>
              <SlideCardIcons friendsCount={friendsCount} likesCount={likesCount}/>
            </div>
          </Avatar>
        </div>

        <div className='flex flex-col justify-center items-center gap-2'>
          {
            authUser?.uid !== userId &&
              <>
                {
                  !loading && <button onClick={handleAddFriend} className='w-28 bg-light-green rounded-full pb-2 px-2 h-fit text-sm font-concert-one'>{areWeFriends ? 'Remove friend' : 'Add friend'}</button>
                }

                {
                  loading && <button className='w-28 bg-light-green rounded-full pb-2 px-2 h-fit text-sm font-concert-one'><Spinner/></button>
                }
              </>
          }

        </div>

      </div>

    </>
  )
}
