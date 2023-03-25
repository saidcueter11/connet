import { Timestamp } from 'firebase/firestore'

export interface NotificationType {
    messages: {
      chatId: string,
      senderAvatar: string,
      senderName: string,
      createdAt: Timestamp,
      status: 'read' | 'unread'
      senderId: string
    },
    likedPost: {
      postLikedId: string,
      userAvatar: string,
      userName: string,
      createdAt: Timestamp,
      status: 'read' | 'unread',
      senderId: string
    },
    commentedPost: {
      postCommentedId: string,
      userAvatar: string,
      userName: string,
      createdAt: Timestamp,
      status: 'read' | 'unread'
      senderId: string
    },
    friendAdded: {
      userId: string,
      userName: string,
      userAvatar: string,
      createdAt: Timestamp,
      status: 'read' | 'unread'
    }
}
export interface UserCollection {
  email?: string,
  firstName?: string,
  lastName?: string,
  registeredAt?: Timestamp,
  username?: string,
  avatar?: string,
  displayName?: string
  program?: string
  id?: string
  friendId?: string
  friends?: string[]
  likesCount?: number
  friendsCount?: number
  chatingWith?: {
    userId: string,
    chatId: string
  }[]
  notifications?: NotificationType[]
  notificationStatus?: 'read' | 'unread'
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
  groupName?: string
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
export interface Message {
  content: string,
  createdAt: Timestamp,
  userId: string,
  imgUrl?: string
  status: 'read' | 'unread'
}

export interface MessageCollection {
  id?: string
  senderUser: UserCollection
  receiverUser: UserCollection
  messages: Message[]
}
