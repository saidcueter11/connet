import { FriendsIcon } from './Icons/FriendsIcon'
import Like from './Icons/Like'

interface SlideCardIconsProps {
  friendsCount: number
  likesCount: number
}

export const SlideCardIcons = ({ friendsCount, likesCount }: SlideCardIconsProps) => {
  return (
    <>
      <div>
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
    </>
  )
}
