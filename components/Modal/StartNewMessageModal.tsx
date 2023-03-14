import { Modal } from 'flowbite-react'
import { useState, useEffect, SyntheticEvent } from 'react'
import { ExpansibleTextarea } from '../Forms/ExpansibleTextarea'
import { CloseIcon } from '../Icons/CloseIcon'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db, sendMessage } from '@firebase/client'
import { collection } from 'firebase/firestore'
import { UserCollection } from 'types/databaseTypes'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'

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
      const listUsers = value?.docs.map(doc => {
        const data: UserCollection = doc.data()
        const { id } = doc

        return { ...data, id }
      })
      listUsers && setUsers(listUsers)
    }
    if (receiverName) setSearch(receiverName)
  }, [loading])
  console.log({ users })

  const selectedUser = users.find(user => (search.length) > 0 && (search.includes(`${user.firstName} ${user.lastName}`)))
  const userSearch = users.filter(user => search.length > 0 && user.id !== authUser?.uid && (user.firstName?.toLowerCase()?.includes(search) || user.lastName?.toLowerCase()?.includes(search)) && !user.chatingWith?.find(chattingUser => chattingUser.userId !== user?.id))
  const loggedUser = users.find(user => user.id === authUser?.uid)

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
      if (doc) router.push(`/messages/${authUser?.uid}/chat/${doc.id}`)
    })
  }

  return (
    <>
      {
        isHydratated &&
          <Modal show={showModal} className='h-screen'>
            <Modal.Body className='relative grid justify-center gap-2 bg-dark-green'>
              <div className='absolute top-2 left-2' onClick={() => setShowModal(false)}>
                <CloseIcon width={30} height={30} fill='none' stroke='#EB6440'/>
              </div>

              <h2 className='text-center font-concert-one text-xl text-ligth-text-green'>New message</h2>

              <form className='grid gap-5 justify-items-center pt-3 relative' onSubmit={handleSubmit}>
                <div className='self-start flex max-w-[240px] gap-3'>
                  <label className='font-concert-one text-ligth-text-green'>To:</label>
                  <input className='rounded bg-light-green px-2 py-1 w-3/4 font-karla' value={search} placeholder='Send to...' onChange={(e) => setSearch(e.target.value)}/>
                </div>

                {
                  (search.length > 0 && userSearch.length > 0) &&
                    <div className='absolute z-40 bg-light-green shadow shadow-black/25 p-2 rounded-lg top-14 w-3/4 flex flex-col gap-2'>
                      {
                        userSearch.map(user => (
                          <p onClick={() => setSearch(`${user.firstName} ${user.lastName}`)} className='font-karla' key={user.id}>{user.firstName} {user.lastName}</p>
                        ))
                      }
                    </div>
                }

                <ExpansibleTextarea content={content} setContent={setContent} imgUrl={imgUrl} setImgUrl={setImgUrl}/>
              </form>
            </Modal.Body>
          </Modal>
      }
    </>

  )
}
