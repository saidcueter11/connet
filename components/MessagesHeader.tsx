export const MessagesHeader = () => {
  return (
    <>
       <header className='relative mb-5'>
        <div className='flex gap-5 flex-col w-4/5 items-center m-auto'>
          <h1 className='font-concert-one text-3xl text-center text-text-dark-green'>Messages</h1>
          <input className='rounded-3xl w-full shadow px-3 py-1 font-karla outline-dark-green' />
        </div>
      </header>
    </>
  )
}
