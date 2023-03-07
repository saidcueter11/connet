import { firestore } from '../../../firebase/admin'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  firestore
    .collection('users')
    .get()
    .then(doc => {
      const users = doc.docs.map(docu => {
        const data = docu.data()
        const id = docu.id

        return { ...data, id }
      })

      res.json({ users })
    })

    .catch(e => {
      res.status(404).end()
    })
}
