import { SyntheticEvent, useState } from 'react'
import { messageNotification, sendMessage } from '@firebase/client'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'
import { ExpansibleTexareaMessages } from 'components/Forms/ExpansibleTexareaMessages'

interface SendMessageFormContainerProps {
  senderName: string
  receiverId: string
}

export const SendMessageFormContainer = ({ senderName, receiverId }: SendMessageFormContainerProps) => {
  const [content, setContent] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const { authUser } = useAuth()
  const router = useRouter()
  const { chatId } = router.query

  const handleSubmit = (e:SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage({
      content,
      userId: authUser?.uid as string,
      imgUrl,
      chatId: chatId as string
    }).then(() => {
      setContent('')
      setImgUrl('')
      messageNotification({
        chatId: chatId as string,
        senderName,
        userId: receiverId,
        senderId: authUser?.uid as string,
        senderAvatar: authUser?.photoURL ?? ''
      })
    })
  }

  return (
    <>
      <form className='flex gap-2 items-center justify-center sticky bottom-0 w-full bg-dark-green p-2 px-3' onSubmit={handleSubmit}>
        <ExpansibleTexareaMessages content={content} setContent={setContent} imgUrl={imgUrl} setImgUrl={setImgUrl}/>
      </form>
    </>

  )
}
