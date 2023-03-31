import { Modal } from 'flowbite-react'
import { CloseIcon } from '../Icons/CloseIcon'
import { CreateGroupForm } from '../Forms/CreateGroupForm'
import { useEffect, useState } from 'react'

interface CreateGroupModalProps {
  showModal: boolean
  setShowModal: (isOpen: boolean) => void
}

export const CreateGroupModal = ({ showModal, setShowModal }: CreateGroupModalProps) => {
  const [isHydratated, setIsHydratated] = useState(false)

  useEffect(() => setIsHydratated(true), [])

  if (isHydratated) {
    return (
    <Modal show={showModal} className='h-screen' position='center' size='md'>

      <Modal.Body className='bg-dark-green rounded-lg p-3'>
        <div className='w-full relative grid '>
          <div className='absolute w-full' onClick={() => setShowModal(false)}>
            <CloseIcon width={30} height={30} fill='none' stroke='#EB6440'/>
          </div>

          <p className='self-start justify-self-center font-concert-one text-ligth-text-green text-xl'>Create Group</p>

          <CreateGroupForm setShowModal={setShowModal}/>
        </div>
      </Modal.Body>

    </Modal>
    )
  }

  return <></>
}
