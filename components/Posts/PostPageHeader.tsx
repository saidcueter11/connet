import ArrowLeft from 'components/Icons/ArrowLeft'
import { useAuth } from 'context/authUserContext'
import { Avatar } from 'flowbite-react'
import { useRouter } from 'next/router'

interface PostPageHeaderProps {
  displayName: string
  userId: string
  groupId?: string
  groupName?: string
}

export const PostPageHeader = ({ displayName, userId, groupId, groupName }: PostPageHeaderProps) => {
  const { authUser } = useAuth()
  const router = useRouter()

  const goToProfile = () => router.push(`/profile/${userId}`)
  const goToGroup = () => router.push(`/group/${groupId}`)
  return (
    <>
      <header className='flex items-center fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-20 py-3 px-3 backdrop-blur-[2px]'>
      <ArrowLeft width={24} height={24} stroke={'#EB6440'}/>
      <div className={`pl-10 ${!displayName.includes('undefined') ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        <Avatar rounded={true} img={authUser?.photoURL ?? ''} className='avatar-img'>
          <h1 onClick={goToProfile} className='font-concert-one text-2xl text-center text-text-dark-green pb-2'>{displayName}</h1>
          {
            groupId && <p onClick={goToGroup}>{groupName}</p>
          }
        </Avatar>
      </div>
    </header>
    </>
  )
}
