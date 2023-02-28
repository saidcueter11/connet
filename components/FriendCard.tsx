import { Avatar } from 'flowbite-react'
import { FriendsIcon } from './Icons/FriendsIcon'
import Like from './Icons/Like'

export const FriendCard = () => {
  return (
    <>
      <div className='flex flex-col h-full items-center justify-center gap-2 p-6'>
        <Avatar rounded={true} size={'lg'}/>
        <h2 className='font-concert-one text-xl text-ligth-text-green'>Said Cueter</h2>

        <div className='flex gap-2'>

          <div >
            <div className='rounded-full bg-light-green p-2'>
              <FriendsIcon width={30} height={30} stroke='#FD8C77' fill='none'/>
            </div>
            <p className='text-center font-concert-one text-ligth-text-green'>100</p>
          </div>

          <div>
            <div className='rounded-full bg-light-green p-2'>
              <Like width={30} height={30} stroke='#FD8C77' fill='none'/>
            </div>
            <p className='text-center font-concert-one text-ligth-text-green'>100</p>
          </div>

        </div>

        <div className='flex gap-4'>
          <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one'>Remove from friend</button>
          <button className='bg-light-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one'>Send direct message</button>
        </div>
      </div>

    </>
  )
}
