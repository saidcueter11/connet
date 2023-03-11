import ArrowLeft from 'components/Icons/ArrowLeft'
import { Avatar } from 'flowbite-react'

interface ChatHeaderProps {
  userName: string
}

export const ChatHeader = ({ userName }:ChatHeaderProps) => {
  return (
    <header className='flex items-center fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-dark-green z-20 py-3 px-3'>
      <div className=''>
        <ArrowLeft width={24} height={24} stroke={'#EB6440'}/>

      </div>
      <div className={`pl-7 ${!userName.includes('undefined') ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        <Avatar rounded={true} >
          <h1 className='font-concert-one text-2xl text-center text-ligth-text-green pb-2'>{userName}</h1>
        </Avatar>
      </div>
    </header>
  )
}
