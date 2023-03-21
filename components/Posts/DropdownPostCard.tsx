import { DotsVerticalIcon } from 'components/Icons/DotsVerticalIcon'
import { Dropdown } from 'flowbite-react'

interface DropdownPostCardProps {
  setShowDeleteModal: (isOpen: boolean) => void
  setShowModifyModal: (isOpen: boolean) => void
}

export const DropdownPostCard = ({ setShowDeleteModal, setShowModifyModal }: DropdownPostCardProps) => {
  return (
    <>
      <div className='absolute right-3 top-3'>
        <Dropdown placement='left' label={<DotsVerticalIcon width={26} height={26} fill='#8D4B3F'/>} size={'sm'} outline={false} arrowIcon={false} inline={true}>
          <Dropdown.Item onClick={() => setShowModifyModal(true)} className='font-concert-one'>
            Modify
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowDeleteModal(true)} className='font-concert-one'>
            Delete
          </Dropdown.Item>
        </Dropdown>
      </div>
    </>
  )
}
