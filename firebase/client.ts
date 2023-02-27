import { getApp, getApps, initializeApp } from 'firebase/app'
import { Timestamp, addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { CommentCollection, PostCollection, UserCollection } from 'types/databaseTypes'
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
  const docRef = doc(db, 'posts', id ?? '')

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

export const incrementLikes = async ({ id, userId }:PostCollection) => {
  const collectionDb = collection(db, 'posts')

  return await updateDoc(doc(collectionDb, id), {
    likesCount: increment(1),
    likes: arrayUnion(userId)
  })
}

export const decrementLikes = async ({ id, userId }:PostCollection) => {
  const collectionDb = collection(db, 'posts')

  return await updateDoc(doc(collectionDb, id), {
    likesCount: increment(-1),
    likes: arrayRemove(userId)
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

export const deletePost = (id: string) => {
  return deleteDoc(doc(db, 'posts', id))
}
