import { FriendsIcon } from './Icons/FriendsIcon'
import Like from './Icons/Like'

interface SlideCardIconsProps {
  friendsCount: number
  likesCount: number
}

export const SlideCardIcons = ({ friendsCount, likesCount }: SlideCardIconsProps) => {
  return (
    <>
      <div className='flex gap-2'>
        <div className='rounded-full bg-light-green flex items-center h-fit p-1'>
          <FriendsIcon width={20} height={20} stroke='#FD8C77' fill='none'/>
        </div>
        <p className='text-center font-concert-one text-ligth-text-green'>{friendsCount}</p>
      </div>

      <div className='flex gap-2'>
        <div className='rounded-full bg-light-green flex items-center h-fit p-1'>
          <Like width={20} height={20} stroke='#FD8C77' fill='none'/>
        </div>
        <p className='text-center font-concert-one text-ligth-text-green'>{likesCount}</p>
      </div>
    </>
  )
}
