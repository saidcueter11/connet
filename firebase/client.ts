import { getApp, getApps, initializeApp } from 'firebase/app'
import { DocumentData, QueryDocumentSnapshot, Timestamp, addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, increment, limit, onSnapshot, orderBy, query, startAfter, updateDoc, where, writeBatch } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { CommentCollection, GroupCollecion, GroupPostCollection, Message, MessageCollection, PostCollection, UserCollection } from 'types/databaseTypes'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDOwobqj3rYHJdldK7jN3dKqaOy4AbiA7o',
  authDomain: 'conet-5404a.firebaseapp.com',
  projectId: 'conet-5404a',
  storageBucket: 'conet-5404a.appspot.com',
  messagingSenderId: '407169396897',
  appId: '1:407169396897:web:d27100d1e5a6b02686c0e0',
  measurementId: 'G-30VBTWN6HT'
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const db = getFirestore(app)

export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logoutWithEmail = () => {
  return signOut(auth)
}

export const addUser = async ({ avatar, email, firstName, lastName, username }: UserCollection) => {
  const collectionDb = collection(db, 'users')
  return await addDoc(collectionDb, {
    avatar,
    email,
    firstName,
    lastName,
    username,
    registeredAt: Timestamp.now()
  })
}

export const addPost = async ({ content, userId, user, commentsCount, likesCount, img }: PostCollection) => {
  const collecitonDb = collection(db, 'posts')

  return await addDoc(collecitonDb, {
    content,
    createdAt: Timestamp.now(),
    userId,
    user,
    likesCount,
    commentsCount,
    img
  })
}

export const modifyPost = async ({ id, content, img }:PostCollection) => {
  const collectionDb = collection(db, 'posts')
  const docRef = doc(collectionDb, id)

  return updateDoc(docRef, {
    content,
    img
  })
}

export const addComment = async ({ content, user, postId, userId }:CommentCollection) => {
  const collectionDb = collection(db, 'posts')

  return await updateDoc(doc(collectionDb, postId), {
    commentsCount: increment(1),
    comments: arrayUnion({
      user,
      content,
      createdAt: Timestamp.now(),
      userId
    })
  })
}

interface likesType {
  id?: string,
  currentUserId?: string,
  userId?: string
}

export const incrementLikes = async ({ id, currentUserId, userId }:likesType) => {
  const collectionDb = collection(db, 'posts')
  const userDb = collection(db, 'users')

  updateDoc(doc(userDb, userId), {
    likesCount: increment(1)
  })

  return await updateDoc(doc(collectionDb, id), {
    likesCount: increment(1),
    likes: arrayUnion(currentUserId)
  })
}

export const decrementLikes = async ({ id, currentUserId, userId }:likesType) => {
  const collectionDb = collection(db, 'posts')
  const userDb = collection(db, 'users')

  updateDoc(doc(userDb, userId), {
    likesCount: increment(-1)
  })

  return await updateDoc(doc(collectionDb, id), {
    likesCount: increment(-1),
    likes: arrayRemove(currentUserId)
  })
}

export const addFriend = async ({ id, friendId }: UserCollection) => {
  const collectionDb = collection(db, 'users')
  const docRef = doc(collectionDb, id)
  const docRefFriend = doc(collectionDb, friendId)

  updateDoc(docRefFriend, {
    friends: arrayUnion(id),
    friendsCount: increment(1)
  })

  return updateDoc(docRef, {
    friends: arrayUnion(friendId),
    friendsCount: increment(1)
  })
}

export const removeFriend = async ({ id, friendId }:UserCollection) => {
  const collectionDb = collection(db, 'users')
  const docRef = doc(collectionDb, id)
  const docRefFriend = doc(collectionDb, friendId)

  updateDoc(docRefFriend, {
    friends: arrayRemove(id),
    friendsCount: increment(-1)
  })

  return updateDoc(docRef, {
    friends: arrayRemove(friendId),
    friendsCount: increment(-1)
  })
}

export const updatePosts = (cb: (post: PostCollection[]) => void) => {
  const collectionDb = collection(db, 'posts')
  const q = query(collectionDb, orderBy('createdAt', 'desc'), limit(10))

  return onSnapshot(q, ({ docs }) => {
    const newPost = docs.map(docu => {
      const data:PostCollection = docu.data()
      const { createdAt } = data
      const normalizedDate = createdAt ? +createdAt?.toDate() : 0
      const { id } = docu

      return { ...data, normalizedDate, id }
    })

    cb(newPost)
  })
}

export const getLatestPosts = async () => {
  const collectionRef = collection(db, 'posts')
  const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(10))
  const data = await getDocs(q)

  const lastPost = data.docs[data.docs.length - 1]
  const newPosts = data.docs.map((doc) => {
    const post: PostCollection = doc.data()
    const { createdAt } = post
    const normalizedDate = createdAt ? +createdAt?.toDate() : 0
    const { id } = doc

    return { ...post, normalizedDate, id }
  })

  return { newPosts, lastPost }
}

export const loadMore = async (lastPostRef: QueryDocumentSnapshot<DocumentData>) => {
  const collectionRef = collection(db, 'posts')
  const q = query(
    collectionRef,
    orderBy('createdAt', 'desc'),
    startAfter(lastPostRef),
    limit(10)
  )
  const data = await getDocs(q)

  const lastPost = data.docs[data.docs.length - 1]
  const newPosts = data.docs.map((doc) => {
    const post = doc.data()
    const { createdAt } = post
    const normalizedDate = createdAt ? +createdAt?.toDate() : 0
    const { id } = doc

    return { ...post, normalizedDate, id }
  })

  return { newPosts, lastPost }
}

export const uploadImage = (file: File, folder?:string) => {
  const storage = getStorage()
  const reference = ref(storage, `${!folder ? 'images' : folder}/${file.name}`)
  return uploadBytesResumable(reference, file)
}

export const deletePost = async (id: string) => {
  return await deleteDoc(doc(db, 'posts', id))
}

export const createGroup = async ({ adminId, groupName, description, privacy, groupAvatar }: GroupCollecion) => {
  const collectionDb = collection(db, 'groups')

  return await addDoc(collectionDb, {
    adminId,
    groupName,
    description,
    privacy,
    groupMembers: arrayUnion(adminId),
    groupAvatar,
    membersCount: increment(1)
  })
}

export const deleteGroup = async (id: string) => {
  const collectionGroupPosts = collection(db, 'groupPosts')
  const q = query(collectionGroupPosts, where('groupId', '==', id))
  const docRef = await getDocs(q)
  const batchDelete = writeBatch(db)
  docRef.forEach(doc => batchDelete.delete(doc.ref))

  await batchDelete.commit()

  return await deleteDoc(doc(db, 'groups', id))
}

export const joinGroup = async (id: string, userId: string) => {
  const collectionDb = collection(db, 'groups')

  return await updateDoc(doc(collectionDb, id), {
    groupMembers: arrayUnion(userId),
    membersCount: increment(1)
  })
}

export const leaveGroup = async (id: string, userId: string) => {
  const collectionDb = collection(db, 'groups')

  return await updateDoc(doc(collectionDb, id), {
    groupMembers: arrayRemove(userId),
    membersCount: increment(-1)
  })
}

export const joinRequestGroup = async (id:string, userId:string) => {
  const collectionDb = collection(db, 'groups')

  return await updateDoc(doc(collectionDb, id), {
    joinRequests: arrayUnion(userId)
  })
}

export const cancelJoinRequest = async (id:string, userId:string) => {
  const collectionDb = collection(db, 'groups')

  return await updateDoc(doc(collectionDb, id), {
    joinRequests: arrayRemove(userId)
  })
}

export const acceptJoinRequestGroup = async (id:string, userId:string) => {
  const collectionDb = collection(db, 'groups')

  return await updateDoc(doc(collectionDb, id), {
    joinRequests: arrayRemove(userId),
    groupMembers: arrayUnion(userId),
    membersCount: increment(1)
  })
}

export const declineJoinRequestGroup = async (id: string, userId: string) => {
  const collectionDb = collection(db, 'groups')

  return await updateDoc(doc(collectionDb, id), {
    joinRequests: arrayRemove(userId)
  })
}

export const removeGroupMember = async (id: string, userId: string) => {
  const collectionDb = collection(db, 'groups')

  return await updateDoc(doc(collectionDb, id), {
    groupMembers: arrayRemove(userId),
    membersCount: increment(-1)
  })
}

export const addGroupPost = async ({ content, userId, user, commentsCount, likesCount, img, groupId, groupName }: GroupPostCollection) => {
  const collecitonDb = collection(db, 'groupPosts')

  return await addDoc(collecitonDb, {
    content,
    createdAt: Timestamp.now(),
    userId,
    user,
    likesCount,
    commentsCount,
    img,
    groupId,
    groupName
  })
}

interface modifyGroupPostType {
  postId: string
  content: string
  img?: string
}

export const modifyGroupPost = async ({ postId, content, img }: modifyGroupPostType) => {
  const collectionDb = collection(db, 'groupPosts')
  const docRef = doc(collectionDb, postId)

  return await updateDoc(docRef, {
    img,
    content
  })
}

export const deleteGroupPost = async (postId: string) => {
  const collecitonDb = collection(db, 'groupPosts')
  const docRef = doc(collecitonDb, postId)

  return await deleteDoc(docRef)
}

export const getLastestGroupPosts = (cb: (post: GroupPostCollection[]) => void, groupId: string) => {
  const collectionDb = collection(db, 'groupPosts')
  const sortedCollection = query(collectionDb, where('groupId', '==', groupId))

  return onSnapshot(sortedCollection, ({ docs }) => {
    const newPost = docs.map(docu => {
      const data:PostCollection = docu.data()
      const { createdAt } = data
      const normalizedDate = createdAt ? +createdAt?.toDate() : 0
      const { id } = docu

      return { ...data, normalizedDate, id }
    })

    cb(newPost)
  })
}

interface likesGroupPostType {
  id?: string,
  currentUserId?: string,
  groupId?: string
}

export const incrementLikesGroupPost = async ({ id, currentUserId, groupId }:likesGroupPostType) => {
  const collectionDb = collection(db, 'groupPosts')
  const userDb = collection(db, 'groups')

  updateDoc(doc(userDb, groupId), {
    likesCount: increment(1)
  })

  return await updateDoc(doc(collectionDb, id), {
    likesCount: increment(1),
    likes: arrayUnion(currentUserId)
  })
}

export const decrementLikesGroupPost = async ({ id, currentUserId, groupId }:likesGroupPostType) => {
  const collectionDb = collection(db, 'groupPosts')
  const userDb = collection(db, 'groups')

  updateDoc(doc(userDb, groupId), {
    likesCount: increment(-1)
  })

  return await updateDoc(doc(collectionDb, id), {
    likesCount: increment(-1),
    likes: arrayRemove(currentUserId)
  })
}

export const addCommentPostGroup = async ({ content, user, postGroupId, userId }:CommentCollection) => {
  const collectionDb = collection(db, 'groupPosts')

  return await updateDoc(doc(collectionDb, postGroupId), {
    commentsCount: increment(1),
    comments: arrayUnion({
      user,
      content,
      createdAt: Timestamp.now(),
      userId
    })
  })
}

interface SendMessageType {
  senderUser?: UserCollection,
  receiverUser?: UserCollection,
  content: string,
  userId: string,
  imgUrl?: string,
  chatId?: string
}

export const sendMessage = async ({ receiverUser, content, userId, senderUser, imgUrl, chatId }: SendMessageType) => {
  const collectionDb = collection(db, 'messages')
  const collectionUsers = collection(db, 'users')

  if (chatId === undefined) {
    const added = await addDoc(collectionDb, {
      receiverUser,
      senderUser,
      messages: arrayUnion({
        content,
        userId,
        imgUrl,
        createdAt: Timestamp.now(),
        status: 'unread'
      })
    })

    await updateDoc(doc(collectionUsers, senderUser?.id), {
      chatingWith: arrayUnion({
        userId: receiverUser?.id,
        chatId: added.id,
        status: 'unread'
      })
    })
    await updateDoc(doc(collectionUsers, receiverUser?.id), {
      chatingWith: arrayUnion({
        userId: senderUser?.id,
        chatId: added.id,
        status: 'unread'
      })
    })

    return added
  }

  if (chatId) {
    return await updateDoc(doc(collectionDb, chatId), {
      messages: arrayUnion({
        content,
        userId,
        imgUrl,
        createdAt: Timestamp.now(),
        status: 'unread'
      })
    })
  }
}

export const updateChatStatus = async (chatId: string) => {
  const docRef = doc(db, 'messages', chatId)

  const docData = await getDoc(docRef)
  const messages: MessageCollection[] = docData.data()?.messages.map((message: Message) => {
    if (message.status === 'unread') {
      return {
        ...message,
        status: 'read'
      }
    } else {
      return message
    }
  })

  return await updateDoc(docRef, { messages })
}

interface newMessageReceivedType {
  userId: string,
  chatId: string,
  senderName: string,
  senderAvatar?: string
  senderId:string
}

export const messageNotification = async ({ userId, chatId, senderName, senderAvatar, senderId }: newMessageReceivedType) => {
  const collectionDb = collection(db, 'users')
  const docRef = doc(collectionDb, userId)

  return await updateDoc(docRef, {
    notifications: arrayUnion({
      messages: {
        chatId,
        senderName,
        senderAvatar: senderAvatar ?? '',
        createdAt: Timestamp.now(),
        status: 'unread',
        senderId
      }
    }),
    notificationStatus: 'unread'
  })
}

interface likedNotificationType {
  postId: string,
  avatar: string,
  fullname: string,
  userId: string
  senderId: string
}

export const likeNotification = async ({ postId, avatar, fullname, userId, senderId }: likedNotificationType) => {
  const collectionDb = collection(db, 'users')
  const docRef = doc(collectionDb, userId)

  return await updateDoc(docRef, {
    notifications: arrayUnion({
      likedPost: {
        postLikedId: postId,
        userAvatar: avatar,
        userName: fullname,
        createdAt: Timestamp.now(),
        status: 'unread',
        senderId
      }
    }),
    notificationStatus: 'unread'
  })
}

interface commentedNotificationType {
  postId: string,
  avatar: string,
  fullname: string,
  userId: string,
  senderId: string
}

export const commentedNotification = async ({ postId, avatar, fullname, userId, senderId }: commentedNotificationType) => {
  const collectionDb = collection(db, 'users')
  const docRef = doc(collectionDb, userId)

  return await updateDoc(docRef, {
    notifications: arrayUnion({
      commentedPost: {
        postCommentedId: postId,
        userAvatar: avatar,
        userName: fullname,
        createdAt: Timestamp.now(),
        status: 'unread',
        senderId
      }
    }),
    notificationStatus: 'unread'
  })
}

interface friendAddedNotificationType {
  userId: string,
  avatar: string,
  fullname: string,
  friendId: string
}

export const friendAddedNotification = async ({ userId, avatar, fullname, friendId }: friendAddedNotificationType) => {
  const collectionDb = collection(db, 'users')
  const docRef = doc(collectionDb, userId)

  return await updateDoc(docRef, {
    notifications: arrayUnion({
      friendAdded: {
        userId: friendId,
        userAvatar: avatar,
        userName: fullname,
        createdAt: Timestamp.now(),
        status: 'unread'
      }
    }),
    notificationStatus: 'unread'
  })
}

export const updateNotificationsStatus = async (userId: string) => {
  const collectionDb = collection(db, 'users')
  const docRef = doc(collectionDb, userId)

  return await updateDoc(docRef, {
    notificationStatus: 'read'
  })
}

interface updateNotificationsEventsProp {
  userId: string,
  chatId?: string,
  postId?: string,
  friendId?: string,
  event: 'messages' | 'friendAdded' | 'commentedPost' | 'likedPost'
}

export const updateNotificationsEvents = async ({ userId, chatId, postId, friendId, event }: updateNotificationsEventsProp) => {
  const collectionDb = collection(db, 'users')
  const docRef = doc(collectionDb, userId)

  const docData = await getDoc(docRef)
  const user = docData.data() as UserCollection

  user.notifications?.map(notification => {
    switch (event) {
      case 'messages':
        if (notification.messages?.chatId === chatId && notification.messages.status === 'unread') {
          notification.messages.status = 'read'
        }
        break
      case 'likedPost':
        if (notification.likedPost?.postLikedId === postId && notification.likedPost.status === 'unread') {
          notification.likedPost.status = 'read'
        }
        break
      case 'commentedPost':
        if (notification.commentedPost?.postCommentedId === postId && notification.commentedPost.status === 'unread') {
          notification.commentedPost.status = 'read'
        }
        break
      case 'friendAdded':
        if (notification.friendAdded?.userId === friendId && notification.friendAdded.status === 'unread') {
          notification.friendAdded.status = 'read'
        }
        break
      default:
        break
    }

    return notification
  })

  return await updateDoc(docRef, { notifications: user.notifications })
}

interface updateUserType {
  userId: string
  avatar?: string
  firstName?: string
  lastName?: string
  username?: string
  program?: string
}

export const updateUser = async ({ userId, avatar, firstName, lastName, username, program }: updateUserType) => {
  const batch = writeBatch(db)
  const newUserInfo = {
    avatar,
    displayName: `${firstName} ${lastName}`,
    username
  }
  // Updates user main profile
  const collectioUsers = collection(db, 'users')
  const docRef = doc(collectioUsers, userId)
  await updateDoc(docRef, {
    avatar: avatar ?? '',
    firstName,
    lastName,
    username,
    program
  })

  // Update notifications user info
  const docRefNotifications = await getDocs(collectioUsers)
  docRefNotifications.forEach(docu => {
    const docRef = doc(collectioUsers, docu.id)
    const data = docu.data() as UserCollection
    data.notifications?.forEach(notification => {
      if (notification.commentedPost && notification.commentedPost.senderId === userId) {
        notification.commentedPost.userAvatar = avatar ?? ''
        notification.commentedPost.userName = `${firstName} ${lastName}`
      }

      if (notification.messages && notification.messages.senderId === userId) {
        notification.messages.senderAvatar = avatar ?? ''
        notification.messages.senderName = `${firstName} ${lastName}`
      }

      if (notification.likedPost && notification.likedPost.senderId === userId) {
        notification.likedPost.userAvatar = avatar ?? ''
        notification.likedPost.userName = `${firstName} ${lastName}`
      }

      if (notification.friendAdded && notification.friendAdded.userId === userId) {
        notification.friendAdded.userAvatar = avatar ?? ''
        notification.friendAdded.userName = `${firstName} ${lastName}`
      }
    })

    batch.update(docRef, { ...data })
  })

  // Updates user's posts
  const collectionPosts = collection(db, 'posts')
  const qPosts = query(collectionPosts, where('userId', '==', userId))
  const docRefPosts = await getDocs(qPosts)
  docRefPosts.forEach(docu => {
    const docRef = doc(collectionPosts, docu.id)
    const data = docu.data() as PostCollection
    data.user = newUserInfo
    data.comments?.forEach(comment => {
      if (comment.userId === userId) {
        comment.user = newUserInfo
      }
    })

    batch.update(docRef, { ...data })
  })

  // Updates user's messages information
  const collectionMessages = collection(db, 'messages')
  const docRefMessages = await getDocs(collectionMessages)
  docRefMessages.forEach(docu => {
    const docRef = doc(collectionMessages, docu.id)
    const data = docu.data() as MessageCollection
    const user = data.receiverUser.id === userId ? data.receiverUser : data.senderUser

    user.firstName = firstName
    user.avatar = avatar
    user.lastName = lastName
    user.username = username

    data.receiverUser.id === userId && batch.update(docRef, { receiverUser: user })
    data.senderUser.id === userId && batch.update(docRef, { senderUser: user })
  })

  // Updates user's posts groups
  const collectionGroupsPosts = collection(db, 'groupPosts')
  const qGroupsPosts = query(collectionGroupsPosts, where('userId', '==', userId))
  const docRefGroupsPosts = await getDocs(qGroupsPosts)
  docRefGroupsPosts.forEach(docu => {
    const docRef = doc(collectionGroupsPosts, docu.id)
    const data = docu.data() as GroupPostCollection
    data.user = newUserInfo
    data.comments?.forEach(comment => {
      if (comment.userId === userId) {
        comment.user = newUserInfo
      }
    })

    batch.update(docRef, { ...data })
  })

  batch.commit()
}
