import { CloseIcon } from 'components/Icons/CloseIcon'
import { Dropdown, Modal } from 'flowbite-react'
import { programs } from 'helpers/listOfPrograms'
import { FormEvent, useEffect, useState } from 'react'

interface ChangeProgramProfileProps {
  showModal: boolean
  program: string
  setShowModal: (isOpen: boolean) => void
  setProgram: (prog: string) => void
}

export const ChangeProgramProfile = ({ showModal, setShowModal, setProgram, program }: ChangeProgramProfileProps) => {
  const [isHydratated, setIsHydratated] = useState(false)
  useEffect(() => setIsHydratated(true), [])

  const handleSaveChanges = (e:FormEvent) => {
    e.preventDefault()
    setShowModal(false)
  }

  if (isHydratated) {
    return (
    <>
      <Modal show={showModal} className='h-screen'>
        <Modal.Body className='rounded-lg bg-dark-green'>
          <div onClick={() => setShowModal(false)}>
            <CloseIcon width={24} height={24} stroke='#FD8C77' fill='none'/>
          </div>
          <form className='w-full flex flex-col gap-4 items-center' onSubmit={handleSaveChanges}>
            <label htmlFor="firstName" className='text-ligth-text-green font-concert-one text-lg'>Programs</label>
            <div className='bg-light-green rounded-lg p-3 flex justify-center w-fit'>
              <Dropdown label={program} className='max-h-full overflow-y-scroll stroke-white w-full' inline={true}>
                {
                  programs.map((pro, i) => <Dropdown.Item onClick={() => setProgram(pro)} key={i}>{pro}</Dropdown.Item>)
                }
              </Dropdown>
            </div>
            {/* <select className='overflow-hidden'>
              {
                programs.map((program, index) => <option className='overflow-hidden' key={index}>{program}</option>)
              }
            </select> */}
            <button className='bg-light-green w-2/5 self-center rounded-lg pb-2 font-concert-one text-dark-green'>Save changes</button>
          </form>

        </Modal.Body>
      </Modal>
    </>
    )
  }

  return <></>
}
