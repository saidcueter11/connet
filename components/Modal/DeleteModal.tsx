import { Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'

interface DeleteModalProps {
  showModal: boolean
  setShowModal: (isOpen: boolean) => void
  deleteMethod: () => void
  text: string
}

export const DeleteModal = ({ showModal, setShowModal, deleteMethod, text }: DeleteModalProps) => {
  const [isHydratated, setIsHydratated] = useState(false)

  useEffect(() => setIsHydratated(true), [])

  if (isHydratated) {
    return (
    <>
      <Modal show={showModal} size={'sm'}>
          <Modal.Body className='bg-dark-green rounded-lg'>
            <div className="text-center">
            <h3 className="mb-5 text-lg font-karla text-ligth-text-green">Are you sure you want to delete this {text}?</h3>
            <div className="flex justify-center gap-4 items-baseline">
              <button className='bg-light-green text-dark-green font-concert-one rounded-lg w-2/5 py-1 pb-3 hover:opacity-80' onClick={deleteMethod}>Yes, I am sure</button>
              <button className='bg-light-green text-dark-green font-concert-one rounded-lg w-2/5 py-1 pb-3 hover:opacity-80' onClick={() => setShowModal(false)}>No, cancel</button>
            </div>
          </div>
          </Modal.Body>
        </Modal>
    </>
    )
  }

  return <></>
}
