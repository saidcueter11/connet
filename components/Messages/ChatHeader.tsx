import ArrowLeft from 'components/Icons/ArrowLeft'
import { Avatar } from 'flowbite-react'
import { useRouter } from 'next/router'

interface ChatHeaderProps {
  userName: string
  userId: string
  avatar?: string
}

export const ChatHeader = ({ userName, userId, avatar }:ChatHeaderProps) => {
  const router = useRouter()

  const goToProfile = () => router.push(`/profile/${userId}`)
  return (
    <header className='flex items-center sticky top-0 w-full rounded-t-lg py-3 px-3 backdrop-blur-[2px] bg-dark-green z-20'>
      <ArrowLeft width={24} height={24} stroke={'#EB6440'}/>
      <div className={`pl-10 ${!userName.includes('undefined') ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        <Avatar rounded={true} onClick={goToProfile} img={avatar} className='avatar-img'>
          <h1 className='font-concert-one text-2xl text-center text-ligth-text-green pb-2'>{userName}</h1>
        </Avatar>
      </div>
    </header>
  )
}
