import { firestore } from '@firebase/admin'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { id } } = req

  firestore
    .collection('users')
    .get()
    .then(doc => {
      const users = doc.docs.map(docu => docu.data())

      res.json({ users, id })
    })

    .catch(e => {
      res.status(404).end()
    })
}
