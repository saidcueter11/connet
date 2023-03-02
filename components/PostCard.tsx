import { Avatar, Dropdown } from 'flowbite-react'
import Like from 'components/Icons/Like'
import { CommentIcon } from 'components/Icons/Comment'
import { Dot } from './Icons/Dot'
import { PostCollection } from 'types/databaseTypes'
import { useTimeAgo } from 'hooks/useTimeAgo'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { decrementLikes, deletePost, incrementLikes } from '@firebase/client'
import { useAuth } from 'context/authUserContext'
import { DotsVerticalIcon } from './Icons/DotsVerticalIcon'
import { AddModal } from './AddModal'

interface PostCardProps {
  post: PostCollection
}

export const PostCard = ({ post }:PostCardProps) => {
  const auth = useAuth()
  const isPostLiked = auth.authUser?.uid ? post.likes?.includes(auth.authUser?.uid) : false
  const normalizeDate = post.createdAt ? post.normalizedDate ?? +post.createdAt?.toDate() : 0
  const timeAgo = useTimeAgo(post.normalizedDate ?? normalizeDate)
  const router = useRouter()
  const { id } = router.query
  const [showModal, setShowModal] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    if (post.id) router.push(`/post/${post.id}`)
  }

  const handleLikes = () => {
    if (!isPostLiked) {
      incrementLikes({
        id: post.id ? post.id : id as string,
        currentUserId: auth.authUser?.uid,
        userId: post.userId
      })
    }

    if (isPostLiked) {
      decrementLikes({
        id: post.id ? post.id : id as string,
        currentUserId: auth.authUser?.uid,
        userId: post.userId
      })
    }
  }

  const handleDelete = () => {
    deletePost(post.id ?? '')
  }

  const handleModify = () => {
    setShowModal(true)
  }

  return (
    <>
      <div className='flex rounded-2xl shadow flex-col p-6 gap-4 bg-light-green shadow-black/25 min-w-[327px] relative'>
        <div className='flex gap-2' onClick={handleClick}>
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
          <div className='flex gap-1' onClick={handleLikes}>
            <Like fill={isPostLiked ? '#8D4B3F' : 'none'} stroke='#8D4B3F' width={24} height={24}/>
            <p className='font-concert-one text-text-dark-green'>{post.likesCount}</p>
          </div>
          <div className='flex gap-1'>
            <CommentIcon fill='none' stroke='#8D4B3F' width={24} height={24}/>
            <p className='font-concert-one text-text-dark-green'>{post.commentsCount}</p>
          </div>
        </div>

        {
          post.userId === auth.authUser?.uid &&
            <div className='absolute right-3 top-3'>
              <Dropdown placement='left' label={<DotsVerticalIcon width={20} height={20} fill='#8D4B3F'/>} size={'sm'} color={'transparent'} outline={false} arrowIcon={false} inline={true} >
                <Dropdown.Item onClick={handleModify} className='font-concert-one'>
                  Modify
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDelete} className='font-concert-one'>
                  Delete
                </Dropdown.Item>
              </Dropdown>
            </div>
        }

      </div>

      {
        typeof window !== 'undefined' && <AddModal postId={post.id} showModal={showModal} setShowModal={setShowModal} initialContent={post.content ?? ''} initialImageUrl={post.img ?? ''}/>
      }
    </>
  )
}
