import { CloseIcon } from 'components/Icons/CloseIcon'
import { Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

interface ChangeUsernameProfileProps {
  showModal: boolean
  username: string
  setShowModal: (isOpen: boolean) => void
  setUsername: (info: string) => void
}

export const ChangeUsernameProfile = ({ showModal, setShowModal, username, setUsername }: ChangeUsernameProfileProps) => {
  const [isHydratated, setIsHydratated] = useState(false)

  useEffect(() => setIsHydratated(true), [])

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(false)
  }

  if (isHydratated) {
    return (
    <>
      <Modal show={showModal} size={'sm'}>
        <Modal.Body className='rounded-lg bg-dark-green'>
          <div onClick={() => setShowModal(false)}>
            <CloseIcon width={24} height={24} stroke='#FD8C77' fill='none'/>
          </div>

          <form className='w-full flex flex-col gap-4' onSubmit={handleSaveChanges}>

            <label htmlFor={username} className='text-ligth-text-green font-concert-one text-lg'>Username</label>
            <input defaultValue={username} id={username} className='bg-light-green rounded p-1 font-karla' onChange={(e) => setUsername(e.target.value)}/>

            <button className='bg-light-green w-2/5 self-center rounded-lg pb-2 font-concert-one text-dark-green'>Save changes</button>
          </form>

        </Modal.Body>
      </Modal>
    </>
    )
  }

  return <></>
}
