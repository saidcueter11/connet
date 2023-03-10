import { sendMessage } from '@firebase/client'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { SendIcon } from 'components/Icons/SendIcon'
import { UploadImgIcon } from 'components/Icons/UploadImgIcon'
import { MessagesContainerMobile } from 'components/MessagesContainerMobile'
import { useAuth } from 'context/authUserContext'
import { FormEvent, SyntheticEvent, useState } from 'react'

export default function ChatPage () {
  const [content, setContent] = useState('')
  const { authUser } = useAuth()

  const handleSubmit = (e:SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage({
      content,
      userId: authUser?.uid as string,
      firstUserName: authUser?.displayName as string,
      secondUserName: 'Valeria',
      senderName: authUser?.displayName as string
    }).then(() => setContent(''))
  }

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

  return (
    <>
      <ArrowLeft width={24} height={24} stroke={'black'}/>
      <header className='relative mb-5'>
        <div className='flex gap-5 flex-col w-4/5 items-center m-auto'>
          <h1 className='font-concert-one text-3xl text-center text-text-dark-green'>Said Cueter</h1>
        </div>
      </header>

      <MessagesContainerMobile>
        <div className='bg-dark-green grid rounded-2xl rounded-bl-none shadow w-4/5 shadow-black/25 p-4 pb-0'>
          <p className='font-karla text-ligth-text-green pb-3'>Random message lor </p>
          <time className='font-karla text-action-red-ligth pb-2'>10:45 PM</time>
        </div>

        <div className='bg-light-green grid rounded-2xl rounded-br-none shadow w-4/5 shadow-black/25 ml-auto p-4 pb-0'>
          <p className='font-karla text-text-dark-green pb-3'>Random message lor </p>
          <time className='font-karla text-action-red pb-2'>10:45 PM</time>
        </div>
      </MessagesContainerMobile>

      <form className='flex gap-2 items-center justify-center absolute bottom-1 left-1/2 transform -translate-x-1/2 w-full bg-dark-green p-2 px-3 h-fit' onSubmit={handleSubmit}>
        <div className='flex w-full bg-light-green relative rounded-xl py-1'>
          <label htmlFor='file-input' className='absolute bottom-2 left-2'>
            <UploadImgIcon width={30} height={30} fill='none' stroke='#EB6440'/>
          </label>
          <input type='file' className='hidden' accept=".jpg, .jpeg, .png" id='file-input'/>

          <div className='bg-light-green rounded-xl flex flex-col justify-center gap-2'>
            <textarea
              className="w-3/4 m-auto pt-2 min-h-[40px] rounded-xl border-transparent focus:outline-none focus:ring-0 focus:border-action-red-ligth bg-light-green font-karla text-text-dark-green"
              value={content}
              onInput={handleInput}
              rows={1}
            />

            <img className='w-3/4 m-auto rounded-lg' src='https://randomwordgenerator.com/img/picture-generator/57e0d1424e50ac14f1dc8460962e33791c3ad6e04e507441722872d79644c7_640.jpg'/>
          </div>

          <button className='absolute right-3 bottom-2 rotate-45' type='submit'>
            <SendIcon width={28} height={28} stroke='#FD8C77' fill='none'/>
          </button>
        </div>
      </form>

    </>
  )
}
