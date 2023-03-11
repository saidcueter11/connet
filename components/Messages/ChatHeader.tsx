import ArrowLeft from 'components/Icons/ArrowLeft'
import { Avatar } from 'flowbite-react'

interface ChatHeaderProps {
  userName: string
}

export const ChatHeader = ({ userName }:ChatHeaderProps) => {
  return (
    <header className='relative w-full'>
      <div className='absolute top-2'>
        <ArrowLeft width={24} height={24} stroke={'black'}/>

      </div>
      <div className={`mb-4 ${!userName.includes('undefined') ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        <Avatar rounded={true} >
          <h1 className='font-concert-one text-2xl text-center text-text-dark-green'>{userName}</h1>
        </Avatar>
      </div>
    </header>
  )
}
