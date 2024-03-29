import { uploadImage } from '@firebase/client'
import { UploadTask, getDownloadURL } from 'firebase/storage'
import React, { FormEvent, useEffect, useState } from 'react'
import { UploadImgContainer } from './UploadImgContainer'
import { SendMessageButton } from 'components/Messages/SendMessageButton'

interface ExpansibleTexareaMessagesProps {
  content: string
  setContent: (newVal: string) => void
  imgUrl: string
  setImgUrl: (newVal: string) => void
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export const ExpansibleTexareaMessages = ({ content, setContent, imgUrl, setImgUrl }: ExpansibleTexareaMessagesProps) => {
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState<UploadTask>()

  function handleInput (event: FormEvent<HTMLTextAreaElement>) {
    const newValue = event.currentTarget.value
    setContent(newValue)
    adjustHeight(event.currentTarget)
  }

  function adjustHeight (textarea: HTMLTextAreaElement) {
    const { style } = textarea
    style.height = 'auto'
    style.height = `${textarea.scrollHeight}px`
    style.overflowY = 'hidden'
    style.resize = 'none'
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

  return (
    <>
      <div className='bg-light-green rounded-lg grid justify-center gap-2 w-full'>
        <div className='w-full flex items-center'>
          <div className={`${imgUrl ? 'self-end pb-3' : ''}`}>
            <UploadImgContainer handleImgChange={handleImgChange} formId='sending-message'/>
          </div>
          <div className='flex flex-col gap-2 py-0.5'>
            <textarea
              className={`rounded-xl min-w-[77vw] md:min-w-[360px] lg:min-w-[500px] focus:outline-none focus:ring-0 focus:border-action-red-ligth bg-light-green font-karla text-text-dark-green text-lg outline-none resize-none border-2 transition-colors ${drag === DRAG_IMAGE_STATES.DRAG_OVER ? 'border-action-red-ligth' : 'border-transparent'}`}
              value={content}
              onInput={handleInput}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              rows={1}
            />

            {
              imgUrl && imgUrl.length > 0 &&
                <div className='relative px-3'>
                  <button className='absolute right-3 top-3 rounded-full bg-black/80 text-slate-50 w-6 h-6' onClick={() => setImgUrl('')}>X</button>
                  <img src={imgUrl} className='rounded h-auto w-full max-h-80 max-w-xs object-contain mb-3'/>
                </div>
            }

          </div>

        </div>

      </div>
      <SendMessageButton input={content || imgUrl}/>
    </>
  )
}
