import { MessagesHeader } from 'components/Messages/MessagesHeader'
import { NavBarMobile } from 'components/Utils/NavBarMobile'
import { MessagesPreviewCard } from 'components/Messages/MessagesPreviewCard'
import { collection } from 'firebase/firestore'
import { db } from '@firebase/client'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useEffect, useState } from 'react'
import { MessageCollection } from 'types/databaseTypes'
import { useAuth } from 'context/authUserContext'
import { SideBarContainer } from 'components/SideBars/SideBarContainer'
import { NavBarDesktop } from 'components/Utils/NavBarDesktop'
import { MainPageLayout } from 'components/Utils/MainPageLayout'
import { PageContenLayout } from 'components/Utils/PageContenLayout'

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
  const sortedChats = loggedUserChats?.sort((a, b) => b.messages.slice(-1)[0].createdAt.seconds - a.messages.slice(-1)[0].createdAt.seconds)
  return (
    <>
      <SideBarContainer/>
      <NavBarDesktop/>
      <MainPageLayout>
        <PageContenLayout>
        <MessagesHeader/>
          {
            sortedChats?.map(message => {
              const lastMessage = message.messages.slice(-1)[0]
              const unreadMessages = message.messages.filter(m => m.status === 'unread' && m.userId !== authUser?.uid).length
              const lastUser = message.receiverUser.id === lastMessage.userId ? message.receiverUser : message.senderUser
              const directMessageUser = message.receiverUser.id === authUser?.uid ? message.senderUser : message.receiverUser

              return <MessagesPreviewCard
                key={message.id}
                chatId={message.id as string}
                content={lastMessage.content}
                lastMessageUser={lastUser.firstName as string}
                directMessageUser={`${directMessageUser.firstName} ${directMessageUser.lastName}`}
                createdAt={lastMessage.createdAt}
                unreadMessages={unreadMessages}
                userAvatar={directMessageUser.avatar}
                />
            })
          }

        </PageContenLayout>

      </MainPageLayout>

      <NavBarMobile/>
    </>
  )
}
