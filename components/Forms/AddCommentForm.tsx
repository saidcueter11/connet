import { Avatar, Spinner } from 'flowbite-react'
import { SendIcon } from '../Icons/SendIcon'
import { SyntheticEvent, useState } from 'react'
import { addComment, addCommentPostGroup } from '@firebase/client'
import { useAuth } from 'context/authUserContext'

interface AddCommentFormProps {
  postId: string
  loading: boolean
  postGroupId?: string
}

export const AddCommentForm = ({ postId, loading, postGroupId }:AddCommentFormProps) => {
  console.log({ postGroupId })
  const [content, setContent] = useState('')
  const auth = useAuth()

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    !postGroupId && addComment({
      content,
      userId: auth.authUser?.uid,
      user: {
        avatar: auth.authUser?.photoURL ?? '',
        displayName: auth.authUser?.displayName?.split('|')[0],
        username: auth.authUser?.displayName?.split('|')[1] ?? ''
      },
      postId
    }).then(() => setContent(''))

    postGroupId && addCommentPostGroup({
      content,
      userId: auth.authUser?.uid,
      user: {
        avatar: auth.authUser?.photoURL ?? '',
        displayName: auth.authUser?.displayName?.split('|')[0],
        username: auth.authUser?.displayName?.split('|')[1] ?? ''
      },
      postGroupId
    }).then(() => setContent(''))
  }

  return (
    <>
      <form className='relative bg-light-green min-h-[80px] w-11/12 mx-auto rounded-xl shadow pt-2 pr-2' onSubmit={handleSubmit}>
        <div className='absolute top-2 left-2'>
          <Avatar size={'sm'} rounded={true}/>
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
