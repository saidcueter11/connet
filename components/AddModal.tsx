import { Modal, Avatar, Textarea } from 'flowbite-react'
import { CloseIcon } from './Icons/CloseIcon'
import { UploadImgIcon } from './Icons/UploadImgIcon'
import { useAuth } from 'context/authUserContext'
import { SyntheticEvent, useState } from 'react'
import { addPost } from '@firebase/client'

interface AddModalProps {
  showModal: boolean
  setShowModal: (modal: boolean) => void
}

export const AddModal = ({ showModal, setShowModal }: AddModalProps) => {
  const auth = useAuth()
  const [content, setContent] = useState('')

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPost({
      content,
      userId: auth.authUser?.uid,
      user: {
        avatar: auth.authUser?.photoURL ?? '',
        displayName: auth.authUser?.displayName?.split('|')[0],
        username: auth.authUser?.displayName?.split('|')[1] ?? ''
      },
      commentsCount: 0,
      likesCount: 0
    }).then(() => setShowModal(false))
  }

  return (
    <Modal show={showModal} className='h-screen' position='center' size='lg'>

      <Modal.Body className='bg-dark-green rounded p-3'>
        <div className='w-full h-72 relative grid place-content-center'>
          <div className='absolute w-full' onClick={() => setShowModal(false)}>
            <CloseIcon width={30} height={30} fill='none' stroke='#EB6440'/>
          </div>

          <div className='grid w-full gap-3'>
            <div className='justify-self-start'>
              <Avatar rounded={true}>
                <p className='font-concert-one text-ligth-text-green text-lg pb-2'>{auth.authUser?.displayName?.split('|')[0]}</p>
              </Avatar>
            </div>

            <form className='relative h-36 w-60 font-karla sm:w-80' onSubmit={handleSubmit}>
              <Textarea placeholder="What's popping?" className='outline-none bg-light-green h-full' onChange={(e) => setContent(e.target.value)}/>

              <div className='absolute bottom-2 left-2'>
                <label htmlFor='file-input'>
                  <UploadImgIcon width={30} height={30} fill='none' stroke='#EB6440'/>
                </label>
                <input type='file' className='hidden' id='file-input'/>
              </div>

              <button className='absolute bottom-2 right-2 bg-dark-green rounded-full px-5 text-ligth-text-green font-concert-one flex items-center pb-2'>Post</button>
            </form>
          </div>

        </div>
      </Modal.Body>

    </Modal>
  )
}
