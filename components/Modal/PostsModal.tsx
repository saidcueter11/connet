import { Modal, Avatar } from 'flowbite-react'
import { CloseIcon } from '../Icons/CloseIcon'
import { useAuth } from 'context/authUserContext'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { addGroupPost, addPost, modifyGroupPost, modifyPost } from '@firebase/client'
import { ExpansibleTextarea } from 'components/Forms/ExpansibleTextarea'
import { EventFeedback } from 'components/Utils/EventFeedback'

interface PostsModalProps {
  showModal: boolean
  setShowModal: (modal: boolean) => void
  initialContent?: string
  initialImageUrl?: string
  postId?: string
  groupId?: string
  groupName?: string
}

export const PostsModal = ({ showModal, setShowModal, initialContent, initialImageUrl, postId, groupId, groupName }: PostsModalProps) => {
  const auth = useAuth()
  const [imgUrl, setImgUrl] = useState(initialImageUrl ?? '')
  const [content, setContent] = useState(initialContent ?? '')
  const [isHydrated, setIsHydratated] = useState(false)
  const [isPosted, setIsPosted] = useState(false)

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (initialContent) {
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
        img: imgUrl
      })

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
      })
    }

    if (initialContent) {
      !groupId && modifyPost({
        id: postId,
        content,
        img: imgUrl
      })

      groupId && modifyGroupPost({
        content,
        img: imgUrl ?? '',
        postId: postId as string
      })
    }

    setContent('')

    setIsPosted(true)
    setTimeout(() => {
      setIsPosted(false)
      setShowModal(false)
    }, (1500))
  }

  useEffect(() => setIsHydratated(true), [])

  if (isHydrated) {
    return (
      <>
        <Modal show={showModal} className='h-screen' position='center' size='lg'>

          <Modal.Body className='relative grid justify-center gap-2 bg-dark-green rounded-lg'>
            <div className='absolute top-2 left-2 h-3 w-3' onClick={() => setShowModal(false)}>
              <CloseIcon width={30} height={30} fill='none' stroke='#EB6440'/>
            </div>

            <div className='grid gap-5 justify-items-center pt-8 relative'>
              <div className='justify-self-start'>
                <Avatar rounded={true} img={auth.authUser?.photoURL ?? ''}>
                  <p className='font-concert-one text-ligth-text-green text-xl pb-2'>{auth.authUser?.displayName?.split('|')[0]}</p>
                </Avatar>
              </div>

              <form className='' onSubmit={handleSubmit}>
                <ExpansibleTextarea content={content} setContent={setContent} imgUrl={imgUrl} setImgUrl={setImgUrl}/>
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
