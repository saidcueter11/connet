import { Avatar } from 'flowbite-react'
import Like from 'components/Icons/Like'
import { CommentIcon } from 'components/Icons/Comment'
import { Dot } from '../Icons/Dot'
import { GroupPostCollection, PostCollection } from 'types/databaseTypes'
import { useTimeAgo } from 'hooks/useTimeAgo'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { decrementLikes, decrementLikesGroupPost, deleteGroupPost, deletePost, incrementLikes, incrementLikesGroupPost, likeNotification } from '@firebase/client'
import { useAuth } from 'context/authUserContext'
import { ModifyPostsModal } from '../Modal/ModifyPostsModal'
import { DeleteModal } from 'components/Modal/DeleteModal'
import { DropdownPostCard } from './DropdownPostCard'

interface PostCardProps {
  post: PostCollection | GroupPostCollection
}

export const PostCard = ({ post }:PostCardProps) => {
  const { authUser } = useAuth()
  const isPostLiked = authUser?.uid ? post.likes?.includes(authUser?.uid) : false
  const normalizeDate = post.createdAt ? post.normalizedDate ?? +post.createdAt?.toDate() : 0
  const timeAgo = useTimeAgo(post.normalizedDate ?? normalizeDate)
  const router = useRouter()
  const { id, postId } = router.query
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    if (post.groupId && post.id) router.push(`/group/${post.groupId}/post/${post.id}`)
    if (post.id && !post.groupId) router.push(`/post/${post.id}`)
  }

  const handleLikes = () => {
    if (!isPostLiked) {
      if (!post.groupId) {
        incrementLikes({
          id: post.id ? post.id : id as string,
          currentUserId: authUser?.uid,
          userId: post.userId
        })
        authUser?.uid !== post.userId && likeNotification({
          avatar: authUser?.photoURL ?? '',
          fullname: authUser?.displayName?.split('|')[0] as string,
          postId: post.id ? post.id : id as string,
          userId: post.userId as string,
          senderId: authUser?.uid as string
        })
      }

      post.groupId && incrementLikesGroupPost({
        id: post.id ? post.id : postId as string,
        groupId: post.groupId,
        currentUserId: authUser?.uid
      })
    }

    if (isPostLiked) {
      !post.groupId && decrementLikes({
        id: post.id ? post.id : id as string,
        currentUserId: authUser?.uid,
        userId: post.userId
      })

      post.groupId && decrementLikesGroupPost({
        id: post.id ? post.id : postId as string,
        groupId: post.groupId,
        currentUserId: authUser?.uid
      })
    }
  }

  const handleDelete = () => {
    !post.groupId && deletePost(post.id as string)
    post.groupId && deleteGroupPost(post.id as string)
    setShowDeleteModal(false)
  }

  return (
    <>
      <div className='flex rounded-2xl shadow flex-col p-6 gap-4 bg-light-green shadow-black/25 min-w-[327px] relative'>
        <div className='flex gap-2' onClick={handleClick}>
          <Avatar rounded={true} img={post.user?.avatar ?? ''} className='avatar-img'>
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
            post.img && <img className='rounded w-full max-h-80 object-contain' src={post.img}/>
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
          post.userId === authUser?.uid && <DropdownPostCard setShowDeleteModal={setShowDeleteModal} setShowModifyModal={setShowModal}/>
        }

      </div>

      <ModifyPostsModal
        postId={post.id}
        showModal={showModal}
        setShowModal={setShowModal}
        initialContent={post.content}
        initialImageUrl={post.img}
        groupId={post.groupId}/>

      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        deleteMethod={handleDelete}
        text='post'/>
    </>
  )
}
