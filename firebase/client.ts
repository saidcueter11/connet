import { getApp, getApps, initializeApp } from 'firebase/app'
import { Timestamp, addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { CommentCollection, GroupCollecion, GroupPostCollection, PostCollection, UserCollection } from 'types/databaseTypes'
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

export const getLastestPosts = (cb: (post: PostCollection[]) => void) => {
  const collectionDb = collection(db, 'posts')
  const sortedCollection = query(collectionDb, orderBy('createdAt', 'desc'))

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

export const getPostsByUserId = (id: string) => {
  const collectionDb = collection(db, 'posts')
  const q = query(collectionDb, where('userId', '==', id))
  const docRef = getDocs(q)

  return docRef.then(res => {
    return res.docs.map(data => {
      const res: PostCollection = data.data()
      return res
    })
  })
}

export const uploadImage = (file: File) => {
  const storage = getStorage()
  const reference = ref(storage, `images/${file.name}`)
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

export const addGroupPost = async ({ content, userId, user, commentsCount, likesCount, img, groupId }: GroupPostCollection) => {
  const collecitonDb = collection(db, 'groupPosts')

  return await addDoc(collecitonDb, {
    content,
    createdAt: Timestamp.now(),
    userId,
    user,
    likesCount,
    commentsCount,
    img,
    groupId
  })
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
