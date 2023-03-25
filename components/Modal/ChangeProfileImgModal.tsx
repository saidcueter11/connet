import { uploadImage } from '@firebase/client'
import { CloseIcon } from 'components/Icons/CloseIcon'
import { UploadTask, getDownloadURL } from 'firebase/storage'
import { Modal, Spinner } from 'flowbite-react'
import React, { FormEvent, useEffect, useState } from 'react'

interface ChangeProfileImgModalProps {
  showModal: boolean
  prevImg: string
  setShowModal: (isOpen: boolean) => void
  setImgUrl: (img: string) => void
  setPrevImg: (img: string) => void
}

export const ChangeProfileImgModal = ({ showModal, setShowModal, prevImg, setImgUrl, setPrevImg }: ChangeProfileImgModalProps) => {
  const [isHydratated, setIsHydratated] = useState(false)
  const [task, setTask] = useState<UploadTask>()
  const [imgLoading, setImgLoading] = useState(false)

  const handleSelectImg = (e:FormEvent) => {
    e.preventDefault()
    setImgUrl(prevImg)
    setShowModal(false)
  }

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined
    if (file) {
      const task = uploadImage(file, 'profilePic')
      setTask(task)
    }
  }

  useEffect(() => {
    if (task) {
      const onProgress = () => {
        setImgLoading(true)
      }
      const onError = () => {}
      const onComplete = () => {
        setImgLoading(false)
        getDownloadURL(task.snapshot.ref).then(setPrevImg)
      }
      task.on('state_changed',
        onProgress,
        onError,
        onComplete
      )
    }
  }, [task])

  useEffect(() => setIsHydratated(true), [])

  if (isHydratated) {
    return (
    <>
      <Modal show={showModal} className='h-screen'>
        <Modal.Body className='bg-dark-green rounded-lg'>
          <div onClick={() => setShowModal(false)}>
            <CloseIcon width={24} height={24} stroke='#FD8C77' fill='none' />
          </div>
          <div className='h-full'>
            <div className="relative w-52 h-52 mx-auto">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white">

                {
                  !prevImg &&
                    <svg className="absolute w-auto h-auto text-gray-400 -bottom-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                }
                {
                  !imgLoading &&
                    <img
                    className="object-cover w-full h-full"
                    src={prevImg}
                  />
                }

                {
                  imgLoading && <Spinner/>
                }
              </div>
            </div>

            <div className='flex w-full justify-around items-baseline pt-4'>
              <div className='text-center bg-light-green font-concert-one pb-3 px-2 rounded-lg pt-1 text-text-dark-green w-2/5'>
                <label htmlFor="previewImg">Change photo</label>
                <input type='file' id='previewImg' onChange={handleChangeImg} className='hidden'/>
              </div>

              <button className='bg-light-green font-concert-one h-10 rounded-lg pb-2 text-text-dark-green w-2/5' onClick={handleSelectImg} >Save changes</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
    )
  }

  return <></>
}
