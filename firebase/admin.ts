
import admin from 'firebase-admin'
import { firebaseCredentials } from './credentials'

const serviceAccount = firebaseCredentials

!admin.apps.length && admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID
  })
})

export const firestore = admin.firestore()
