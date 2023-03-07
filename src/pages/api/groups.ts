import { firestore } from '../../../firebase/admin'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  firestore
    .collection('groups')
    .get()
    .then(doc => {
      const groups = doc.docs.map(docu => {
        const data = docu.data()
        const id = docu.id

        return { ...data, id }
      })

      res.json({ groups })
    })

    .catch(e => {
      res.status(404).end()
    })
}
