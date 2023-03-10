import { SyntheticEvent, useState } from 'react'
import { sendMessage } from '@firebase/client'
import { useAuth } from 'context/authUserContext'
import { ExpansibleTextarea } from '../Forms/ExpansibleTextarea'
import { UploadImgContainer } from '../Forms/UploadImgContainer'
import { MessageContainer } from './MessageContainer'
import { SendMessageButton } from './SendMessageButton'

export const SendMessageFormContainer = () => {
  const [content, setContent] = useState('')
  const { authUser } = useAuth()

  const handleSubmit = (e:SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage({
      content,
      userId: authUser?.uid as string,
      firstUserName: authUser?.displayName as string,
      secondUserName: 'Valeria',
      senderName: authUser?.displayName as string
    }).then(() => setContent(''))
  }

  return (
    <>
      <form className='flex gap-2 items-center justify-center absolute bottom-1 left-1/2 transform -translate-x-1/2 w-full bg-dark-green p-2 px-3 h-fit' onSubmit={handleSubmit}>
        <MessageContainer>
          <UploadImgContainer/>

          <ExpansibleTextarea content={content} setContent={setContent}/>

          <SendMessageButton/>
        </MessageContainer>
      </form>
    </>

  )
}
