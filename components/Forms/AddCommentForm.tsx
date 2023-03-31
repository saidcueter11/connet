import { Avatar, Spinner } from 'flowbite-react'
import { SendIcon } from '../Icons/SendIcon'
import { SyntheticEvent, useState } from 'react'
import { addComment, addCommentPostGroup, commentedNotification } from '@firebase/client'
import { useAuth } from 'context/authUserContext'

interface AddCommentFormProps {
  postId: string
  loading: boolean
  postGroupId?: string
  postUserId: string
}

export const AddCommentForm = ({ postId, loading, postGroupId, postUserId }:AddCommentFormProps) => {
  const [content, setContent] = useState('')
  const { authUser } = useAuth()

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    !postGroupId && addComment({
      content,
      userId: authUser?.uid,
      user: {
        avatar: authUser?.photoURL ?? '',
        displayName: authUser?.displayName?.split('|')[0],
        username: authUser?.displayName?.split('|')[1] ?? ''
      },
      postId
    }).then(() => {
      setContent('')
      console.log({
        avatar: authUser?.photoURL ?? '',
        fullname: authUser?.displayName?.split('|')[0] as string,
        postId,
        userId: postUserId
      })
      authUser?.uid !== postUserId && commentedNotification({
        avatar: authUser?.photoURL ?? '',
        fullname: authUser?.displayName?.split('|')[0] as string,
        postId,
        userId: postUserId,
        senderId: authUser?.uid as string
      })
    })

    postGroupId && addCommentPostGroup({
      content,
      userId: authUser?.uid,
      user: {
        avatar: authUser?.photoURL ?? '',
        displayName: authUser?.displayName?.split('|')[0],
        username: authUser?.displayName?.split('|')[1] ?? ''
      },
      postGroupId
    }).then(() => setContent(''))
  }

  return (
    <>
      <form className='relative bg-light-green min-h-[80px] w-11/12 mx-auto rounded-xl shadow shadow-black/25 pt-2 pr-2 md:w-3/5 max-w-md' onSubmit={handleSubmit}>
        <div className='absolute top-2 left-2'>
          <Avatar size={'sm'} rounded={true} img={authUser?.photoURL ?? ''} className='avatar-img'/>
        </div>
        <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder='Write a comment' className='font-karla rounded-lg h-3/6 w-5/6 bg-inherit text-sm outline-none resize-none border-none absolute right-0'></textarea>
        <button className='absolute bottom-2 right-3' disabled={content.length === 0}>
          {
            !loading
              ? <SendIcon width={22} height={22} stroke={ content.length > 0 ? '#FD8C77' : '#FCC5BB'} fill='none'/>
              : <Spinner/>
          }
        </button>
      </form>
    </>
  )
}
