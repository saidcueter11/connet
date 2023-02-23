import { Avatar } from 'flowbite-react'
import Like from 'components/Icons/Like'
import { CommentIcon } from 'components/Icons/Comment'
import { Dot } from './Icons/Dot'
import { PostCollection } from 'types/databaseTypes'
import { useTimeAgo } from 'hooks/useTimeAgo'
import { useRouter } from 'next/router'
import React from 'react'

interface PostCardProps {
  post: PostCollection
}

export const PostCard = ({ post }:PostCardProps) => {
  const timeAgo = useTimeAgo(post.normalizedDate ?? 0)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    router.push(`/profile/${post.userId}`)
  }
  return (
    <>
      <div className='flex rounded-2xl shadow flex-col p-6 gap-4 bg-light-green shadow-black/25' onClick={handleClick}>
        <div className='flex gap-2 '>
          <Avatar rounded={true}>
            <div className='flex items-end'>
              <p className='font-concert-one'>{post.user?.displayName}</p>
              <Dot width={20} height={14} fill='#8D4B3F'/>
              <time className='text-xs text-action-red font-karla'>{timeAgo}</time>
            </div>
            <small className='font-karla text-action-red'>@{post.user?.username ?? 'saidcueter11'}</small>
          </Avatar>
        </div>
        <p className='font-karla px-5'>{post.content}</p>

        {
          post.img && <img className='rounded' src={post.img}/>
        }

        <div className='flex justify-end gap-3'>
          <div className='flex justify-start gap-2'>
            <Like fill='none' stroke='#8D4B3F' width={24} height={24}/>
            <p className='font-concert-one'>{post.likesCount}</p>
          </div>
          <div className='flex gap-2'>
            <CommentIcon fill='none' stroke='#8D4B3F' width={24} height={24}/>
            <p className='font-concert-one'>{post.commentsCount}</p>
          </div>
        </div>
      </div>
    </>
  )
}
