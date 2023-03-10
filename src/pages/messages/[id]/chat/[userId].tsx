import ArrowLeft from 'components/Icons/ArrowLeft'
import { MessagesContainerMobile } from 'components/Messages/MessagesContainerMobile'
import { SendMessageFormContainer } from 'components/Messages/SendMessageFormContainer'

export default function ChatPage () {
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

      <SendMessageFormContainer/>

    </>
  )
}
