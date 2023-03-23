import { Modal, Avatar } from 'flowbite-react'
import { CloseIcon } from '../Icons/CloseIcon'
import { useAuth } from 'context/authUserContext'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { addGroupPost, addPost } from '@firebase/client'
import { ExpansibleTextarea } from 'components/Forms/ExpansibleTextarea'
import { EventFeedback } from 'components/Utils/EventFeedback'

interface CreatePostModalProps {
  showModal: boolean
  setShowModal: (modal: boolean) => void
  postId?: string
  groupId?: string
  groupName?: string
}

export const CreatePostModal = ({ showModal, setShowModal, groupId, groupName }: CreatePostModalProps) => {
  const auth = useAuth()
  const [imgUrl, setImgUrl] = useState('')
  const [content, setContent] = useState('')
  const [isHydrated, setIsHydratated] = useState(false)
  const [isPosted, setIsPosted] = useState(false)

  const clearInputs = () => {
    setContent('')

    setIsPosted(true)
    setTimeout(() => {
      setIsPosted(false)
      setShowModal(false)
    }, (1500))
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    !groupId && addPost({
      content,
      userId: auth.authUser?.uid,
      user: {
        avatar: auth.authUser?.photoURL ?? '',
        displayName: auth.authUser?.displayName?.split('|')[0],
        username: auth.authUser?.displayName?.split('|')[1] ?? ''
      },
      commentsCount: 0,
      likesCount: 0,
      img: imgUrl ?? ''
    }).then(() => clearInputs())

    groupId && addGroupPost({
      content,
      userId: auth.authUser?.uid,
      user: {
        avatar: auth.authUser?.photoURL ?? '',
        displayName: auth.authUser?.displayName?.split('|')[0],
        username: auth.authUser?.displayName?.split('|')[1] ?? ''
      },
      commentsCount: 0,
      likesCount: 0,
      img: imgUrl ?? '',
      groupId,
      groupName
    }).then(() => clearInputs())
  }

  useEffect(() => setIsHydratated(true), [])

  const handleCloseModal = () => {
    setShowModal(false)
    setContent('')
    setImgUrl('')
  }

  if (isHydrated) {
    return (
      <>
        <Modal show={showModal} className='h-screen' position='center' size='lg'>
          <Modal.Body className='relative grid justify-center gap-2 bg-dark-green rounded-lg'>
            <div className='absolute top-2 left-2 h-3 w-3' onClick={handleCloseModal}>
              <CloseIcon width={30} height={30} fill='none' stroke='#EB6440'/>
            </div>

            <div className='grid gap-5 justify-items-center pt-8 relative'>
              <div className='justify-self-start'>
                <Avatar rounded={true} img={auth.authUser?.photoURL ?? ''} className='avatar-img'>
                  <p className='font-concert-one text-ligth-text-green text-xl'>{auth.authUser?.displayName?.split('|')[0]}</p>
                  {
                    groupName && <p className='font-karla text-ligth-text-green'>{groupName}</p>
                  }
                </Avatar>
              </div>

              <form onSubmit={handleSubmit}>
                <ExpansibleTextarea content={content} setContent={setContent} imgUrl={imgUrl} setImgUrl={setImgUrl} formId='create-post'/>
              </form>
            </div>
          </Modal.Body>

          <EventFeedback event={isPosted} eventDescription='Post has been added'/>
        </Modal>
      </>
    )
  }

  return <></>
}
