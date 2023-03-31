import { Dropdown, Modal } from 'flowbite-react'
import { useState, useEffect, SyntheticEvent } from 'react'
import { ExpansibleTextarea } from '../Forms/ExpansibleTextarea'
import { CloseIcon } from '../Icons/CloseIcon'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db, messageNotification, sendMessage } from '@firebase/client'
import { collection } from 'firebase/firestore'
import { UserCollection } from 'types/databaseTypes'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'
import { SearchIcon } from 'components/Icons/SearchIcon'

interface StartNewMessageModalProps {
  showModal: boolean
  setShowModal: (isOpen: boolean) => void
  receiverName?: string
  receiverId?: string
}

export const StartNewMessageModal = ({ showModal, setShowModal, receiverName, receiverId }: StartNewMessageModalProps) => {
  const { authUser } = useAuth()
  const [isHydratated, setIsHydratated] = useState(false)
  const [content, setContent] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<UserCollection[]>([])
  const collectionUsers = collection(db, 'users')
  const [value, loading, error] = useCollection<UserCollection>(collectionUsers)
  const router = useRouter()

  if (error) return <p>There was an error</p>

  useEffect(() => {
    setIsHydratated(true)
    if (!loading) {
      const listUsers: UserCollection[] = value?.docs.map(doc => {
        const data: UserCollection = doc.data()
        const { id } = doc

        return { ...data, id }
      }) as UserCollection[]
      setUsers(listUsers)
    }
    if (receiverName) setSearch(receiverName)
  }, [loading, showModal])

  const selectedUser = users.find(user => (search.length) > 0 && (search.includes(`${user.firstName} ${user.lastName}`)))
  const loggedUser = users.find(user => user.id === authUser?.uid)
  const userFriends = users.filter(user => loggedUser?.friends?.includes(user.id as string))

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage({
      content,
      receiverUser: selectedUser as UserCollection,
      senderUser: loggedUser as UserCollection,
      userId: loggedUser?.id as string,
      imgUrl
    }).then(doc => {
      setShowModal(false)
      if (doc) {
        messageNotification({
          chatId: doc.id,
          senderName: `${loggedUser?.firstName} ${loggedUser?.lastName}`,
          userId: selectedUser?.id as string,
          senderId: loggedUser?.id as string,
          senderAvatar: loggedUser?.avatar
        })

        router.push(`/messages/${authUser?.uid}/chat/${doc.id}`)
      }
    })
  }

  const handleSelectUser = (firstName?: string, lastName?: string, userId?: string) => {
    setSearch(`${firstName} ${lastName}`)
    const isChatStarted = loggedUser?.chatingWith?.find(user => user.userId === userId)
    if (isChatStarted) {
      console.log('here')
      router.push(`/messages/${authUser?.uid}/chat/${isChatStarted.chatId}`)
    }
  }

  return (
    <>
      {
        isHydratated &&
          <Modal show={showModal} className='h-screen' size={'lg'}>
            <Modal.Body className='relative grid justify-center gap-2 bg-dark-green rounded-lg'>
              <div className='absolute top-2 left-2' onClick={() => setShowModal(false)}>
                <CloseIcon width={30} height={30} fill='none' stroke='#EB6440'/>
              </div>

              <h2 className='text-center font-concert-one text-xl text-ligth-text-green'>New message</h2>

              <form className='grid gap-5 justify-items-center pt-3 relative' onSubmit={handleSubmit}>
                <div className='self-start flex gap-2'>
                  <Dropdown label={
                    <div className='flex gap-3 items-center'>
                      <input className='rounded bg-light-green px-2 py-1 w-3/4 font-karla' value={search} placeholder='Find friends...' disabled/>
                      <SearchIcon width={24} height={24} fill='none' stroke='#EB6440'/>
                    </div>
                  } size={'sm'} outline={false} arrowIcon={false} color={''}>
                    <Dropdown.Header>
                      <div className='flex flex-col justify-center items-center gap-2 w-full'>
                        <p className='font-concert-one text-center'>Your friends</p>
                        <input className='rounded bg-light-green px-2 py-1 w-3/4 font-karla' value={search} placeholder='Find friends' onChange={(e) => setSearch(e.target.value)}/>
                      </div>
                    </Dropdown.Header>
                      {
                        userFriends.map(user => {
                          if (user.firstName?.toLocaleLowerCase().includes(search)) {
                            return <Dropdown.Item
                              onClick={() => handleSelectUser(user.firstName, user.lastName, user.id)}
                              className='font-karla'
                              key={user.id}>
                                {user.firstName} {user.lastName} ({user.username})
                            </Dropdown.Item>
                          }

                          return <></>
                        })
                      }
                  </Dropdown>
                </div>

                <ExpansibleTextarea content={content} setContent={setContent} imgUrl={imgUrl} setImgUrl={setImgUrl} formId='start-messaeg'/>
              </form>
            </Modal.Body>
          </Modal>
      }
    </>

  )
}
