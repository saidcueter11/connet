
import admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

!admin.apps.length && admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export const firestore = admin.firestore()
