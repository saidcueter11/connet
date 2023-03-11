import { db } from '@firebase/client'
import ArrowLeft from 'components/Icons/ArrowLeft'
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
    <>
      <ArrowLeft width={24} height={24} stroke={'black'}/>
      <header className='relative mb-5'>
        <div className='flex gap-5 flex-col w-4/5 items-center m-auto'>
          <h1 className='font-concert-one text-3xl text-center text-text-dark-green'>{chatUser?.firstName} {chatUser?.lastName}</h1>
        </div>
      </header>

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

    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id, chatId } = context.query
  return { props: { userId: id, currentChatId: chatId } }
}
