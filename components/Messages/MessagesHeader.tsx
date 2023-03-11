import { useState } from 'react'
import { StartNewMessageModal } from '../Modal/StartNewMessageModal'

export const MessagesHeader = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <header className='mb-2 flex flex-col items-center gap-3'>
        <div className='flex gap-5 flex-col w-4/5 items-center m-auto'>
          <h1 className='font-concert-one text-3xl text-center text-text-dark-green'>Messages</h1>
          <input className='rounded-3xl w-full shadow px-3 py-1 font-karla outline-dark-green' />
        </div>

        <button className='bg-dark-green rounded-2xl px-3 pb-2 font-concert-one pt-0 text-ligth-text-green' onClick={() => setShowModal(true)}>Start new chat</button>
     </header>

      <StartNewMessageModal showModal={showModal} setShowModal={setShowModal}/>

    </>
  )
}
