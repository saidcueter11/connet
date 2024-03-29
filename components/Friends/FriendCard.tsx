import { Avatar, Spinner } from 'flowbite-react'
import { addFriend, friendAddedNotification, removeFriend } from '@firebase/client'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'
import { SlideCardIcons } from '../Utils/SlideCardIcons'
import { useState } from 'react'
import { EventFeedback } from 'components/Utils/EventFeedback'
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
  const [friendEvent, setFriendEvent] = useState(false)
  const [eventDescription, setEventDescription] = useState('')

  const handleAddFriend = () => {
    setLoading(true)
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
        setLoading(false)
      })
      setFriendEvent(true)
      setEventDescription(`${displayName} was added to your friends`)
      setTimeout(() => {
        setFriendEvent(false)
      }, 1500)
    }

    if (areWeFriends) {
      removeFriend({
        id: authUser?.uid,
        friendId: userId
      }).then(() => setLoading(false))

      setFriendEvent(true)
      setEventDescription(`${displayName} was removed from your friends`)
      setTimeout(() => {
        setFriendEvent(false)
      }, 1500)
    }
  }

  const goToProfile = () => router.push(`/profile/${userId}`)

  return (
    <>
      <div className='flex bg-dark-green rounded-lg p-3 justify-between min-w-[330px] md:min-h-[168px] md:max-w-[280px] md:min-w-[200px] lg:min-w-[280px] w-full md:col-span-1 md:flex-col gap-3'>
        <div onClick={goToProfile} className='pr-3 md:p-0 cursor-pointer'>
          <Avatar rounded={true} img={avatar} className='avatar-img md:flex-col'>
            <p className='text-ligth-text-green mb-1 md:text-center md:mr-2 hover:underline cursor-pointer'>{displayName} {userId === authUser?.uid && '(You)'}</p>
            <div className='flex gap-2 md:justify-center'>
              <SlideCardIcons friendsCount={friendsCount} likesCount={likesCount}/>
            </div>
          </Avatar>
        </div>

        <div className='flex flex-col justify-center items-center gap-2'>
          {
            authUser?.uid !== userId &&
              <>
                {
                  !loading && <button onClick={handleAddFriend} className='w-28 bg-light-green rounded-full pb-2 px-2 h-fit text-sm font-concert-one hover:opacity-80'>{areWeFriends ? 'Remove friend' : 'Add friend'}</button>
                }

                {
                  loading && <button className='w-28 bg-light-green rounded-full pb-2 px-2 h-fit text-sm font-concert-one'><Spinner/></button>
                }
              </>
          }

        </div>

      </div>

      <EventFeedback event={friendEvent} eventDescription={eventDescription}/>
    </>
  )
}
