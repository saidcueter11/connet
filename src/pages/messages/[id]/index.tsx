import { MessagesHeader } from 'components/Messages/MessagesHeader'
import { NavBarMobile } from 'components/Utils/NavBarMobile'
import { SideBarProfile } from 'components/SideBars/SideBarProfile'
import { MessagesPreviewCard } from 'components/Messages/MessagesPreviewCard'
import { collection } from 'firebase/firestore'
import { db } from '@firebase/client'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useEffect, useState } from 'react'
import { MessageCollection } from 'types/databaseTypes'
import { useAuth } from 'context/authUserContext'

export default function ChatsPage () {
  const collectionMessages = collection(db, 'messages')
  const { authUser } = useAuth()
  const [value, loading, error] = useCollection(collectionMessages)
  const [chats, setChats] = useState<MessageCollection[]>()

  if (error) return <p>There was an error</p>

  useEffect(() => {
    if (!loading) {
      const newMessages = value?.docs.map(doc => {
        const data = doc.data() as MessageCollection
        const { id } = doc

        return { ...data, id }
      })

      setChats(newMessages)
    }
  }, [loading, value])

  const loggedUserChats = chats?.filter(chat => chat.receiverUser.id === authUser?.uid || chat.senderUser.id === authUser?.uid)

  return (
    <>
      <SideBarProfile/>
      <MessagesHeader/>

      <section className='h-full pt-2 overflow-y-scroll flex flex-col gap-3 no-scrollbar'>
        {
          loggedUserChats?.map(message => {
            const lastMessage = message.messages.slice(-1)[0]
            const lastUser = message.receiverUser.id === lastMessage.userId ? message.receiverUser : message.senderUser
            const directMessageUser = message.receiverUser.id === authUser?.uid ? message.senderUser : message.receiverUser

            return <MessagesPreviewCard
              key={message.id}
              chatId={message.id as string}
              content={lastMessage.content}
              lastMessageUser={lastUser.firstName as string}
              directMessageUser={`${directMessageUser.firstName} ${directMessageUser.lastName}`}
              createdAt={lastMessage.createdAt}
              />
          })
        }

      </section>

      <NavBarMobile/>
    </>
  )
}
