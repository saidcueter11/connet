
import admin from 'firebase-admin'

const serviceAccount = require('./conet-5404a-firebase-adminsdk-kd4ev-3fad3af0f2.json')

!admin.apps.length && admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export const firestore = admin.firestore()
