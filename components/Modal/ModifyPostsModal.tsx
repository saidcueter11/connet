import { Modal, Avatar } from 'flowbite-react'
import { CloseIcon } from '../Icons/CloseIcon'
import { useAuth } from 'context/authUserContext'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { modifyGroupPost, modifyPost } from '@firebase/client'
import { ExpansibleTextarea } from 'components/Forms/ExpansibleTextarea'
import { EventFeedback } from 'components/Utils/EventFeedback'

interface ModifyPostsModalProps {
  showModal: boolean
  setShowModal: (modal: boolean) => void
  initialContent?: string
  initialImageUrl?: string
  postId?: string
  groupId?: string
  groupName?: string
}

export const ModifyPostsModal = ({ showModal, setShowModal, initialContent, initialImageUrl, postId, groupId, groupName }: ModifyPostsModalProps) => {
  const auth = useAuth()
  const [newImg, setNewImg] = useState(initialImageUrl)
  const [content, setContent] = useState(initialContent)
  const [isHydrated, setIsHydratated] = useState(false)
  const [isPosted, setIsPosted] = useState(false)

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    !groupId && modifyPost({
      id: postId,
      content,
      img: newImg ?? ''
    })

    groupId && modifyGroupPost({
      content: content as string,
      img: newImg ?? '',
      postId: postId as string
    })

    setIsPosted(true)
    setTimeout(() => {
      setIsPosted(false)
      setShowModal(false)
    }, (1500))
  }

  useEffect(() => setIsHydratated(true), [])

  const handleCloseModal = () => {
    setShowModal(false)
    setContent(initialContent)
    setNewImg(initialImageUrl)
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
                  <p className='font-concert-one text-ligth-text-green text-xl pb-2'>{auth.authUser?.displayName?.split('|')[0]}</p>
                  {
                    groupName && <p className='font-karla text-ligth-text-green'>{groupName}</p>
                  }
                </Avatar>
              </div>

              <form onSubmit={handleSubmit}>
                <ExpansibleTextarea content={content} setContent={setContent} imgUrl={newImg} setImgUrl={setNewImg} formId='modify-post'/>
              </form>
            </div>
          </Modal.Body>

          <EventFeedback event={isPosted} eventDescription='Post has been modified'/>
        </Modal>
      </>
    )
  }

  return <></>
}
