import { Avatar } from 'flowbite-react'
import Like from 'components/Icons/Like'
import { CommentIcon } from 'components/Icons/Comment'
import { Dot } from './Icons/Dot'
import { PostCollection } from 'types/databaseTypes'
import { useTimeAgo } from 'hooks/useTimeAgo'
import { useRouter } from 'next/router'
import React from 'react'
import { decrementLikes, incrementLikes } from '@firebase/client'
import { useAuth } from 'context/authUserContext'

interface PostCardProps {
  post: PostCollection
}

export const PostCard = ({ post }:PostCardProps) => {
  const normalizeDate = post.createdAt ? post.normalizedDate ?? +post.createdAt?.toDate() : 0
  const timeAgo = useTimeAgo(post.normalizedDate ?? normalizeDate)
  const router = useRouter()
  const { id } = router.query
  const auth = useAuth()

  const isPostLiked = auth.authUser?.uid ? post.likes?.includes(auth.authUser?.uid) : false

  const handleClick = (e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    if (post.id)router.push(`/post/${post.id}`)
  }

  const handleLikes = () => {
    if (!isPostLiked) {
      incrementLikes({
        id: post.id ? post.id : id as string,
        userId: auth.authUser?.uid
      })
    }

    if (isPostLiked) {
      decrementLikes({
        id: post.id ? post.id : id as string,
        userId: auth.authUser?.uid
      })
    }
  }
  return (
    <>
      <div className='flex rounded-2xl shadow flex-col p-6 gap-4 bg-light-green shadow-black/25 min-w-[327px]'>
        <div className='flex gap-2 '>
          <Avatar rounded={true}>
            <div className='flex items-end'>
              <p className='font-concert-one text-text-dark-green'>{post.user?.displayName}</p>
              <Dot width={20} height={14} fill='#8D4B3F'/>
              <time className='text-xs text-action-red font-karla'>{timeAgo}</time>
            </div>
            <small className='font-karla text-action-red'>@{post.user?.username ?? 'saidcueter11'}</small>
          </Avatar>
        </div>
        <div className='flex flex-col gap-2' onClick={handleClick}>
          <p className='font-karla px-5 text-text-dark-green'>{post.content}</p>

          {
            post.img && <img className='rounded' src={post.img}/>
          }
        </div>

        <div className='flex justify-end gap-3'>
          <div className='flex gap-2' onClick={handleLikes}>
            <Like fill={isPostLiked ? '#8D4B3F' : 'none'} stroke='#8D4B3F' width={24} height={24}/>
            <p className='font-concert-one text-text-dark-green'>{post.likesCount}</p>
          </div>
          <div className='flex gap-2'>
            <CommentIcon fill='none' stroke='#8D4B3F' width={24} height={24}/>
            <p className='font-concert-one text-text-dark-green'>{post.commentsCount}</p>
          </div>
        </div>
      </div>
    </>
  )
}
