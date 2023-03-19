import { Avatar } from 'flowbite-react'
import { Dot } from '../Icons/Dot'
import { CommentCollection } from 'types/databaseTypes'
import { useTimeAgo } from 'hooks/useTimeAgo'
import { useAuth } from 'context/authUserContext'

interface CommentCardProps {
  comment: CommentCollection
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { authUser } = useAuth()
  const normalizeDate = comment.createdAt ? comment.normalizedDate ?? +comment.createdAt?.toDate() : 0
  const timeAgo = useTimeAgo(comment.normalizedDate ?? normalizeDate)
  return (
    <>
       <div className='flex rounded-2xl shadow flex-col p-2 pb-5 gap-2 bg-light-green shadow-black/25 w-5/6 m-auto'>
            <div className='flex gap-2 '>
              <Avatar size={'sm'} rounded={true} img={authUser?.photoURL ?? ''} className='avatar-img'>
                <div className='flex items-end'>
                  <p className='text-sm font-concert-one text-text-dark-green'>{comment.user?.displayName}</p>
                  <Dot width={20} height={14} fill='#8D4B3F'/>
                  <time className='text-xs text-action-red font-karla'>{timeAgo}</time>
                </div>
                <small className='font-karla text-action-red text-xs'>@{comment.user?.username ?? 'saidcueter11'}</small>
              </Avatar>
            </div>
            <p className='font-karla px-5 text-text-dark-green'>{comment.content}</p>
        </div>
    </>
  )
}
