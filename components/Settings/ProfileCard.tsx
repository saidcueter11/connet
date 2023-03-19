import { EditIcon } from 'components/Icons/EditIcon'
import { EyeClosedIcon } from 'components/Icons/EyeClosedIcon'
import { EyeOpenIcon } from 'components/Icons/EyeOpenIcon'
import { ChangeInfoProfileModal } from 'components/Modal/ChangeInfoProfile'
import { useState } from 'react'

interface ProfileCardProps {
  text: 'Name' | 'Username' | 'Email' | 'Password' | 'Program'
  info: string
  setInfo?: (info: string) => void
}

export const ProfileCard = ({ text, info, setInfo }: ProfileCardProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleShowPassword = () => setShowPassword(prev => !prev)
  return (
    <>
      <div className='relative w-4/5 gap-2 flex-col flex p-3 items-baseline bg-light-green rounded-lg shadow-black/25 shadow'>
        <p className='font-concert-one text-xl text-text-dark-green'>{text}</p>
        <p className='font-karla text-lg text-text-dark-green'>{(!showPassword && text === 'Password') ? '●●●●●●●●' : info}</p>
        {
          text !== 'Email' &&
            <div className='absolute flex justify-center items-center right-0 -top-2 bg-dark-green rounded-full h-7 w-7' onClick={() => setShowModal(true)}>
              <EditIcon width={18} height={18} stroke='#FD8C77' fill='none'/>
            </div>
        }

        {
          text === 'Password' &&
            <div className='absolute flex justify-center items-center left-24 top-4 bg-dark-green rounded-full h-6 w-6' onClick={handleShowPassword}>
            {
              showPassword && <EyeOpenIcon width={16} height={16} stroke='#FD8C77' fill='none'/>
            }

            {
              !showPassword && <EyeClosedIcon width={16} height={16} stroke='#FD8C77' fill='none'/>
            }
          </div>
        }
      </div>

      <ChangeInfoProfileModal setShowModal={setShowModal} info={info} showModal={showModal} text={text} setInfo={setInfo}/>
    </>
  )
}
