import { useState } from 'react'
import { StartNewMessageModal } from '../Modal/StartNewMessageModal'

export const MessagesHeader = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <header className='mb-2 flex flex-col items-center gap-3'>
        <div className='flex gap-5 flex-col w-4/5 items-center m-auto pb-5 md:hidden'>
          <h1 className='font-concert-one text-3xl text-center text-text-dark-green'>Messages</h1>
        </div>

        <button className='bg-dark-green rounded-2xl px-3 pb-2 font-concert-one pt-0 text-ligth-text-green' onClick={() => setShowModal(true)}>Start new chat</button>
     </header>

      <StartNewMessageModal showModal={showModal} setShowModal={setShowModal}/>

    </>
  )
}
