import { CloseIcon } from 'components/Icons/CloseIcon'
import { Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

interface ChangeNameProfileModalProps {
  showModal: boolean
  firstName: string
  lastName: string
  setShowModal: (isOpen: boolean) => void
  setFirstName: (info: string) => void
  setLastName: (info: string) => void
}

export const ChangeNameProfileModal = ({ showModal, setShowModal, setFirstName, setLastName, lastName, firstName }: ChangeNameProfileModalProps) => {
  const [isHydratated, setIsHydratated] = useState(false)

  useEffect(() => setIsHydratated(true), [])

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(false)
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
            <label htmlFor="firstName" className='text-ligth-text-green font-concert-one text-lg'>First Name</label>
            <input defaultValue={firstName} onChange={e => setFirstName(e.target.value)} id='firstName' type='text' className='bg-light-green rounded p-1 font-karla'/>

            <label htmlFor="lastName" className='text-ligth-text-green font-concert-one text-lg'>Last Name</label>
            <input defaultValue={lastName} onChange={e => setLastName(e.target.value)} id='lastName' type='text' className='bg-light-green rounded p-1 font-karla'/>

            <button className='bg-light-green w-2/5 self-center rounded-lg pb-2 font-concert-one text-dark-green'>Save changes</button>
          </form>

        </Modal.Body>
      </Modal>
    </>
    )
  }

  return <></>
}
