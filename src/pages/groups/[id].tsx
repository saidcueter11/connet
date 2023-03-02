import { CarosuelContainer } from 'components/CaroselContainer'
import { CreateGroupModal } from 'components/CreateGroupModal'
import { NavBarMobile } from 'components/NavBarMobile'
import { SideBarProfile } from 'components/SideBarProfile'
import { SlideCardIcons } from 'components/SlideCardIcons'
import { Avatar, Tabs } from 'flowbite-react'
import { useState } from 'react'

export default function GroupsPage () {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <SideBarProfile/>
      <section className='h-full grid justify-center w-full grid-rows-10'>
        <h1 className='font-concert-one text-3xl text-center row-span-1 text-text-dark-green'>Groups</h1>

        <div className='row-span-3 flex flex-col items-center font-concert-one'>
          <Tabs.Group style='underline' className='justify-center'>
            <Tabs.Item active={true} title='My groups'>
              <CarosuelContainer>
                <div className='flex flex-col h-full items-center justify-center gap-2 p-6'>
                  <div>
                    <Avatar rounded={true} size={'lg'}/>
                    <h2 className='font-concert-one text-xl text-ligth-text-green'>Group name</h2>
                  </div>

                  <div className='flex gap-2'>
                    <SlideCardIcons friendsCount={0} likesCount={0}/>
                  </div>

                  <button className='bg-light-green text-text-dark-green rounded-full pb-2 pt-0 px-2 text-sm font-concert-one h-9 w-28'>Join Group</button>
                </div>
              </CarosuelContainer>

            </Tabs.Item>

            <Tabs.Item title='Discover'>
              <CarosuelContainer>
                <p>sas</p>
              </CarosuelContainer>
            </Tabs.Item>
          </Tabs.Group>
          <button className='w-3/5 bg-dark-green rounded-full pb-2 text-ligth-text-green' onClick={() => setShowModal(true)}>Create group</button>
        </div>

      </section>

      <CreateGroupModal setShowModal={setShowModal} showModal={showModal}/>

      <NavBarMobile/>
    </>
  )
}
