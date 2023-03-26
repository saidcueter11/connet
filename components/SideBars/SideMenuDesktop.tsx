import { LogoutIcon } from 'components/Icons/LogoutIcon'
import { SettingsIcon } from 'components/Icons/SettingsIcon'
import { useAuth } from 'context/authUserContext'
import { Avatar } from 'flowbite-react'
import Link from 'next/link'

export const SideMenuDesktop = () => {
  const auth = useAuth()

  return (
    <aside className='hidden md:block col-span-3 mt-16 h-fit max-w-[280px] min-w-[280px] justify-self-end'>
          <div className='bg-dark-green rounded-lg px-2'>
            <div className='p-2 flex flex-col items-center gap-1'>
              <Avatar size={'lg'} rounded={true}/>
              <h2 className='font-concert-one text-ligth-text-green text-lg'>Said Cueter</h2>
              <p className='font-karla text-ligth-text-green text-sm'>Computer programming</p>
            </div>

            <div>
              <div className='flex justify-between px-4'>
                <p className='font-karla text-ligth-text-green'>Friends</p>
                <p className='font-karla text-ligth-text-green'>0</p>
              </div>

              <div className='flex justify-between px-4'>
                <p className='font-karla text-ligth-text-green'>Likes</p>
                <p className='font-karla text-ligth-text-green'>0</p>
              </div>

              <div className='px-2 py-4 font-karla text-ligth-text-green flex flex-col items-start gap-1'>
                <Link href={`/setting/${auth.authUser?.uid}`} className='flex items-end gap-2 w-fit'>
                  <SettingsIcon width={20} height={20} fill='none' stroke='#FD8C77'/>
                  <p className='text-ligth-text-green font-karla text-sm'>Settings</p>
                </Link>

                <div className='flex items-end gap-2 w-fit pl-0.5'>
                  <LogoutIcon width={20} height={20} fill='none' stroke='#FD8C77'/>
                  <p className='text-ligth-text-green font-karla text-sm'>Logout</p>
                </div>
              </div>

            </div>
          </div>

          <div className='bg-dark-green rounded-lg mt-3 flex flex-col items-start p-4 gap-2'>
            <Avatar rounded={true}>
              <p className='font-concert-one text-ligth-text-green'>Said Cueter</p>
              <button className='text-xs font-karla font-bold bg-light-green rounded-full px-3 py-0.5'>View profile</button>
            </Avatar>

            <Avatar rounded={true}>
              <p className='font-concert-one text-ligth-text-green'>Said Cueter</p>
              <button className='text-xs font-karla font-bold bg-light-green rounded-full px-3 py-0.5'>View profile</button>
            </Avatar>

            <Avatar rounded={true}>
              <p className='font-concert-one text-ligth-text-green'>Said Cueter</p>
              <button className='text-xs font-karla font-bold bg-light-green rounded-full px-3 py-0.5'>View profile</button>
            </Avatar>

            <button className='text-xs font-karla font-bold bg-light-green rounded-full px-3 py-0.5 w-3/4 self-center mt-2'>Go to friends</button>
          </div>

          <div className='bg-dark-green rounded-lg mt-3 flex flex-col items-start p-4 gap-2'>
            <Avatar rounded={true}>
              <p className='font-concert-one text-ligth-text-green'>Said Cueter</p>
              <button className='text-xs font-karla font-bold bg-light-green rounded-full px-3 py-0.5'>View profile</button>
            </Avatar>

            <Avatar rounded={true}>
              <p className='font-concert-one text-ligth-text-green'>Said Cueter</p>
              <button className='text-xs font-karla font-bold bg-light-green rounded-full px-3 py-0.5'>View profile</button>
            </Avatar>

            <Avatar rounded={true}>
              <p className='font-concert-one text-ligth-text-green'>Said Cueter</p>
              <button className='text-xs bg-light-green rounded-full px-3 py-0.5'>View profile</button>
            </Avatar>

            <button className='text-xs bg-light-green rounded-full px-3 py-0.5 w-3/4 self-center mt-2'>Go to groups</button>
          </div>
        </aside>
  )
}
