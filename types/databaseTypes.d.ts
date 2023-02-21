import { Timestamp } from 'firebase/firestore'

export interface UserCollection {
  email?: string,
  firstName?: string,
  lastName?: string,
  registeredAt?: Timestamp,
  username?: string,
  avatar?: string,
  displayName?: string
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
  img?: string
}
