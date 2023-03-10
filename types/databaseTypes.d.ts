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
  friends?: string[]
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
  postGroupId?: string
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
  groupId?: string
}

export interface GroupPostCollection extends PostCollection {
  groupId?: string
}

export interface GroupCollecion {
  adminId?: string,
  groupName?: string,
  description?: string,
  privacy?: string,
  groupAvatar?: string,
  groupMembers?: string[],
  membersCount?: number,
  likesCount?: number,
  id?: string,
  joinRequests?: string[]
}

export interface MessageCollection {
  firstUser: string
  secondUser: string
  messages: [
    content: string,
    createdAt: Timestamp,
    userId: string
  ]
}
