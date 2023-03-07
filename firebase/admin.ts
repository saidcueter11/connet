
import admin from 'firebase-admin'
import { firebaseCredentials } from './credentials'

const serviceAccount = JSON.parse(firebaseCredentials)

!admin.apps.length && admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export const firestore = admin.firestore()
