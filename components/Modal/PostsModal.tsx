import { Modal, Avatar } from 'flowbite-react'
import { CloseIcon } from '../Icons/CloseIcon'
import { useAuth } from 'context/authUserContext'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { addGroupPost, addPost, modifyPost } from '@firebase/client'
import { ExpansibleTextarea } from 'components/Forms/ExpansibleTextarea'

interface PostsModalProps {
  showModal: boolean
  setShowModal: (modal: boolean) => void
  initialContent?: string
  initialImageUrl?: string
  postId?: string
  groupId?: string
}

export const PostsModal = ({ showModal, setShowModal, initialContent = '', initialImageUrl = '', postId, groupId }: PostsModalProps) => {
  const auth = useAuth()
  const [imgUrl, setImgUrl] = useState(initialImageUrl)
  const [content, setContent] = useState(initialContent)
  const [isHydrated, setIsHydratated] = useState(false)

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (initialContent.length === 0 && !groupId) {
      addPost({
        content,
        userId: auth.authUser?.uid,
        user: {
          avatar: auth.authUser?.photoURL ?? '',
          displayName: auth.authUser?.displayName?.split('|')[0],
          username: auth.authUser?.displayName?.split('|')[1] ?? ''
        },
        commentsCount: 0,
        likesCount: 0,
        img: imgUrl
      }).then(() => {
        setContent('')
        setShowModal(false)
      })
    }

    if (initialContent.length > 0 && !groupId) {
      modifyPost({
        id: postId,
        content,
        img: imgUrl
      }).then(() => {
        setContent('')
        setShowModal(false)
      })
    }

    if (initialContent.length === 0 && groupId) {
      addGroupPost({
        content,
        userId: auth.authUser?.uid,
        user: {
          avatar: auth.authUser?.photoURL ?? '',
          displayName: auth.authUser?.displayName?.split('|')[0],
          username: auth.authUser?.displayName?.split('|')[1] ?? ''
        },
        commentsCount: 0,
        likesCount: 0,
        img: imgUrl,
        groupId
      }).then(() => {
        setContent('')
        setShowModal(false)
      })
    }
  }

  useEffect(() => setIsHydratated(true), [])

  if (isHydrated) {
    return (
    <Modal show={showModal} className='h-screen' position='center' size='lg'>

      <Modal.Body className='relative grid justify-center gap-2 bg-dark-green'>
        <div className='absolute top-2 left-2' onClick={() => setShowModal(false)}>
          <CloseIcon width={30} height={30} fill='none' stroke='#EB6440'/>
        </div>

        <div className='grid gap-5 justify-items-center pt-8 relative'>
          <div className='justify-self-start'>
            <Avatar rounded={true}>
              <p className='font-concert-one text-ligth-text-green text-xl pb-2'>{auth.authUser?.displayName?.split('|')[0]}</p>
            </Avatar>
          </div>

          <form className='' onSubmit={handleSubmit}>
            <ExpansibleTextarea content={content} setContent={setContent} imgUrl={imgUrl} setImgUrl={setImgUrl}/>
          </form>
        </div>
      </Modal.Body>

    </Modal>
    )
  }

  return <></>
}
