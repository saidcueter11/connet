import { CreateGroupModal } from 'components/Modal/CreateGroupModal'

interface GroupsHeaderProps {
  setShowModal: (isOpen: boolean) => void
  showModal: boolean
}

export const GroupsHeader = ({ setShowModal, showModal }: GroupsHeaderProps) => {
  return (
    <>
      <header className='mb-2 flex flex-col items-center gap-3'>
        <div className='flex gap-5 flex-col w-4/5 items-center pb-6'>
          <h1 className='font-concert-one text-3xl text-center text-text-dark-green'>Groups</h1>
        </div>

        <button className='bg-dark-green rounded-2xl px-3 w-2/5 pb-2 font-concert-one pt-0 text-ligth-text-green' onClick={() => setShowModal(true)}>Create group</button>
     </header>

     <CreateGroupModal setShowModal={setShowModal} showModal={showModal}/>

    </>
  )
}
