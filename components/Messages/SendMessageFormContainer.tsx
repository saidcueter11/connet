import { SyntheticEvent, useState } from 'react'
import { sendMessage } from '@firebase/client'
import { useAuth } from 'context/authUserContext'
import { ExpansibleTextarea } from '../Forms/ExpansibleTextarea'
import { useRouter } from 'next/router'

export const SendMessageFormContainer = () => {
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
    }).then(() => setContent(''))
  }

  return (
    <>
      <form className='flex gap-2 items-center justify-center absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-dark-green p-2 px-3' onSubmit={handleSubmit}>
        <ExpansibleTextarea content={content} setContent={setContent} imgUrl={imgUrl} setImgUrl={setImgUrl}/>
      </form>
    </>

  )
}
