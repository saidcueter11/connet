import { db } from '@firebase/client'
import { ChatHeader } from 'components/Messages/ChatHeader'
import { MessagesCard } from 'components/Messages/MessagesCard'
import { MessagesContainerMobile } from 'components/Messages/MessagesContainerMobile'
import { SendMessageFormContainer } from 'components/Messages/SendMessageFormContainer'
import { collection, doc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { MessageCollection } from 'types/databaseTypes'

interface ChatPageProps {
  userId: string
  currentChatId: string
}

export default function ChatPage ({ userId, currentChatId }: ChatPageProps) {
  const router = useRouter()
  const chatId = router.query.chatId ?? currentChatId
  const id = router.query.id ?? userId
  const collectionMessages = collection(db, 'messages')
  const docRef = doc(collectionMessages, chatId as string)
  const [messages, setMessages] = useState<MessageCollection>()
  const [value, loading, error] = useDocument(docRef)

  if (error) return <p>There was an error</p>

  useEffect(() => {
    if (!loading) {
      const snap: MessageCollection = value?.data() as MessageCollection
      setMessages(snap)
    }
  }, [loading, value])

  const loggedUser = messages?.receiverUser.id === id ? messages?.receiverUser : messages?.senderUser
  const chatUser = loggedUser?.id === messages?.receiverUser.id ? messages?.senderUser : messages?.receiverUser

  return (
    <main className='h-screen w-full'>
      <ChatHeader userName={`${chatUser?.firstName} ${chatUser?.lastName}`}/>

      <MessagesContainerMobile>
        {
          messages?.messages.map((message, index) => (
            <MessagesCard
              createdAt={message.createdAt}
              imgUrl={message.imgUrl as string}
              content={message.content}
              userId={message.userId}
              key={index}
              />
          ))
        }
      </MessagesContainerMobile>

      <SendMessageFormContainer/>

    </main>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id, chatId } = context.query
  return { props: { userId: id, currentChatId: chatId } }
}
