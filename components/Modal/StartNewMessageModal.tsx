import { Modal } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { ExpansibleTextarea } from '../Forms/ExpansibleTextarea'
import { CloseIcon } from '../Icons/CloseIcon'

interface StartNewMessageModalProps {
  showModal: boolean
  setShowModal: (isOpen: boolean) => void
}

export const StartNewMessageModal = ({ showModal, setShowModal }: StartNewMessageModalProps) => {
  const [isHydratated, setIsHydratated] = useState(false)
  const [content, setContent] = useState('')

  useEffect(() => setIsHydratated(true), [])
  return (
    <>
      {
        isHydratated &&
          <Modal show={showModal} className='h-screen'>
            <Modal.Body className='relative grid justify-center'>
              <div className='absolute top-2 left-2' onClick={() => setShowModal(false)}>
                <CloseIcon width={30} height={30} fill='none' stroke='#EB6440'/>
              </div>

              <h2 className='text-center font-concert-one text-xl'>New message</h2>
              <ExpansibleTextarea content={content} setContent={setContent}/>
            </Modal.Body>
          </Modal>
      }
    </>

  )
}
