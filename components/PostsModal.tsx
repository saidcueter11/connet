import { Modal, Avatar } from 'flowbite-react'
import { CloseIcon } from './Icons/CloseIcon'
import { UploadImgIcon } from './Icons/UploadImgIcon'
import { useAuth } from 'context/authUserContext'
import React, { FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { addGroupPost, addPost, modifyPost, uploadImage } from '@firebase/client'
import { UploadTask, getDownloadURL } from 'firebase/storage'

interface PostsModalProps {
  showModal: boolean
  setShowModal: (modal: boolean) => void
  initialContent?: string
  initialImageUrl?: string
  postId?: string
  groupId?: string
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export const PostsModal = ({ showModal, setShowModal, initialContent = '', initialImageUrl = '', postId, groupId }: PostsModalProps) => {
  const auth = useAuth()
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState<UploadTask>()
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

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        getDownloadURL(task.snapshot.ref).then(setImgUrl)
      }
      task.on('state_changed',
        onProgress,
        onError,
        onComplete
      )
    }
  }, [task])

  useEffect(() => setIsHydratated(true), [])

  const handleDragEnter = (e: FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e: FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const file = e.dataTransfer?.files[0]
    setDrag(DRAG_IMAGE_STATES.NONE)

    if (file) {
      const task = uploadImage(file)
      setTask(task)
    }
  }

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files ? e.target.files[0] : undefined

    if (file) {
      const task = uploadImage(file)
      setTask(task)
    }
  }

  if (isHydrated) {
    return (
    <Modal show={showModal} className='h-screen' position='center' size='lg'>

      <Modal.Body className='bg-dark-green rounded p-3'>
        <div className='w-full min-h-[400px] relative grid place-content-center'>
          <div className='absolute w-full' onClick={() => setShowModal(false)}>
            <CloseIcon width={30} height={30} fill='none' stroke='#EB6440'/>
          </div>

          <div className='grid w-full gap-3'>
            <div className='justify-self-start'>
              <Avatar rounded={true}>
                <p className='font-concert-one text-ligth-text-green text-lg pb-2'>{auth.authUser?.displayName?.split('|')[0]}</p>
              </Avatar>
            </div>

            <form className='grid min-h-[144px] w-60 font-karla sm:w-80 bg-light-green rounded-lg p-3 gap-2' onSubmit={handleSubmit}>

              <textarea placeholder="What's popping?" className={`w-full h-32 rounded-lg bg-light-green text-lg outline-none resize-none border-2 transition-colors ${drag === DRAG_IMAGE_STATES.DRAG_OVER ? 'border-action-red' : 'border-transparent'}`}
                onChange={(e) => setContent(e.target.value)}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                value={content}
                required={true}
              />

              {
                imgUrl.length > 0 &&
                    <div className='relative'>
                      <button className='absolute right-3 top-3 rounded-full bg-black/80 text-slate-50 w-6 h-6' onClick={() => setImgUrl('')}>X</button>
                      <img src={imgUrl} className='rounded h-auto w-full mb-3'/>
                    </div>
              }

              <div className='flex justify-between max-h-8 self-end'>
                <label htmlFor='file-input'>
                  <UploadImgIcon width={30} height={30} fill='none' stroke='#EB6440'/>
                </label>
                <input type='file' className='hidden' onChange={handleImgChange} accept=".jpg, .jpeg, .png" id='file-input'/>
                <button className='bg-dark-green rounded-full px-5 text-ligth-text-green font-concert-one flex items-center pb-2'>{
                  initialContent.length === 0 ? 'Post' : 'Save'
                }</button>
              </div>

            </form>
          </div>

        </div>
      </Modal.Body>

    </Modal>
    )
  }

  return <></>
}
