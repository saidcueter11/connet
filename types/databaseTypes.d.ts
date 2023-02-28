import { Timestamp } from 'firebase/firestore'

export interface UserCollection {
  email?: string,
  firstName?: string,
  lastName?: string,
  registeredAt?: Timestamp,
  username?: string,
  avatar?: string,
  displayName?: string
  id?: string
  friendId?: string
  friends?: UserCollection[]
  likesCount?: number
  friendsCount?: number
}

export interface CommentCollection {
  user?: UserCollection,
  content?: string,
  createdAt?: Timestamp,
  normalizedDate?: number,
  postId?: string,
  userId?: string,
}

export interface PostCollection {
  content?: string,
  userId?: string,
  createdAt?: Timestamp
  id?: string
  normalizedDate?: number
  user?: UserCollection
  likesCount?: number
  commentsCount?: number,
  img?: string,
  comments?: CommentCollection[],
  likes?: string[]
}
