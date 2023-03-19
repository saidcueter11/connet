import { CloseIcon } from 'components/Icons/CloseIcon'
import { Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

interface ChangeInfoProfileModalProps {
  showModal: boolean
  text: string
  info: string
  setShowModal: (isOpen: boolean) => void
  setInfo?: (info: string) => void
}

export const ChangeInfoProfileModal = ({ showModal, setShowModal, text, info, setInfo }: ChangeInfoProfileModalProps) => {
  const [isHydratated, setIsHydratated] = useState(false)
  const [newInfo, setNewInfo] = useState(info)

  useEffect(() => setIsHydratated(true), [])

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(false)
    setInfo && setInfo(newInfo)
  }

  if (isHydratated) {
    return (
    <>
      <Modal show={showModal}>
        <Modal.Body className='rounded-lg bg-dark-green'>
          <div onClick={() => setShowModal(false)}>
            <CloseIcon width={24} height={24} stroke='#FD8C77' fill='none'/>
          </div>

          <form className='w-full flex flex-col gap-4' onSubmit={handleSaveChanges}>
            {
              text === 'Password' &&
                <>
                  <label htmlFor="input-password" className='text-ligth-text-green font-concert-one text-lg'>Confirm old password</label>
                  <input id='input-password' type='password' className='bg-light-green rounded p-1 font-karla'/>

                  <label htmlFor="input-new-password" className='text-ligth-text-green font-concert-one text-lg'>Enter new password</label>
                  <input id='input-new-password' type='password' className='bg-light-green rounded p-1 font-karla'/>

                  <label htmlFor="confirm-new-password" className='text-ligth-text-green font-concert-one text-lg'>Confirm new password</label>
                  <input id='confirm-new-password' type='password' className='bg-light-green rounded p-1 font-karla'/>
                </>
            }

            {
              text !== 'Password' &&
                <>
                  <label htmlFor={text} className='text-ligth-text-green font-concert-one text-lg'>{text}</label>
                  <input defaultValue={info} id={text} className='bg-light-green rounded p-1 font-karla' onChange={(e) => setNewInfo(e.target.value)}/>
                </>
            }

            <button className='bg-light-green w-2/5 self-center rounded-lg pb-2 font-concert-one text-dark-green'>Save changes</button>
          </form>

        </Modal.Body>
      </Modal>
    </>
    )
  }

  return <></>
}
