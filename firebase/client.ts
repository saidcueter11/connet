import { getApp, getApps, initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

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
  signInWithEmailAndPassword(auth, email, password)
}

export const logoutWithEmail = () => {
  signOut(auth)
}

// export const getTest = () => {
//   const userId = 'hiF1QwPqWmbSH1kzhzud' // replace with the actual user ID
//   const postsRef = query(collection(db, 'posts'), where('userId', '==', userId))

//   // const userRef = collection(db, 'users')

//   return getDocs(postsRef).then(snap => {
//     const { docs } = snap
//     docs.map(doc => {
//       const data = doc.data()
//       console.log({ data })
//     })
//     return snap.docs
//   })
// }
