import { MessagesHeader } from 'components/Messages/MessagesHeader'
import { NavBarMobile } from 'components/Utils/NavBarMobile'
import { SideBarProfile } from 'components/SideBars/SideBarProfile'
import { useAuth } from 'context/authUserContext'
import { Avatar } from 'flowbite-react'
import Link from 'next/link'

export default function ChatsPage () {
  const { authUser } = useAuth()
  const id = '10'

  return (
    <>
      <SideBarProfile/>
      <MessagesHeader/>

      <section className='h-full pt-2 overflow-y-scroll flex flex-col gap-3 no-scrollbar pb-48'>

        <Link href={`/messages/${authUser?.uid}/chat/${id}`} className='grid grid-cols-2 p-4 bg-light-green shadow shadow-black/25 rounded-2xl relative '>
          <Avatar rounded={true} className='col-span-2 self-start justify-self-start'>
            <p className='font-concert-one text-lg pb-2 text-text-dark-green'>Said Cueter</p>
          </Avatar>
          <p className='col-span-2 pl-14 font-karla text-text-dark-green'>This is a message</p>

          <time className='absolute top-3 right-4 text-sm text-action-red font-karla'>10:45 PM</time>
        </Link>

      </section>

      <NavBarMobile/>
    </>
  )
}
