import { firestore } from '../../../../firebase/admin'
import { NextApiRequest, NextApiResponse } from 'next'
import { PostCollection } from 'types/databaseTypes'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { id } } = req

  if (id && typeof id === 'string') {
    firestore
      .collection('users')
      .doc(id)
      .get()
      .then(doc => {
        const user: PostCollection = doc.data() ?? {}
        const { id } = doc

        firestore
          .collection('posts')
          .where('userId', '==', id)
          .get()
          .then(doc => {
            const data = doc.docs.map(docu => {
              const data:PostCollection = docu.data() ?? {}
              const { createdAt } = data
              const normalizedDate = createdAt ? +createdAt?.toDate() : 0
              const { id } = docu
              const { comments } = data
              const normalizedComments = comments?.map(comment => {
                const normDate = comment.createdAt ? +comment.createdAt?.toDate() : 0
                comment.normalizedDate = normDate
                return comment
              })

              return { ...data, normalizedDate, id, comments: normalizedComments }
            })

            res.json({ user, data })
          })
      })

      .catch(e => {
        res.status(404).end()
      })
  }
}
