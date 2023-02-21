import { Timestamp } from 'firebase/firestore'

export interface UserCollection {
  email?: string,
  firstName?: string,
  lastName?: string,
  registeredAt?: Timestamp,
  username?: string,
  avatar?: string
}
