import { AddCommentForm } from 'components/AddCommentForm'
import { CommentCard } from 'components/CommentCard'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { FriendsIcon } from 'components/Icons/FriendsIcon'
import { GroupIcon } from 'components/Icons/GroupsIcon'
import { SendIcon } from 'components/Icons/SendIcon'
import { PostCard } from 'components/PostCard'
import { Avatar } from 'flowbite-react'
import { PostCollection } from 'types/databaseTypes'
import { useDocument } from 'react-firebase-hooks/firestore'
import { db } from '@firebase/client'
import { doc } from 'firebase/firestore'
import { useRouter } from 'next/router'

export default function Profile () {
  const router = useRouter()
  const { id } = router.query
  const [value, loading, error] = useDocument(
    doc(db, 'posts', id as string),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  )

  const props: PostCollection | undefined = value?.data() ?? undefined

  if (error) return <p>There was an error...</p>

  if (props !== undefined) {
    return (
    <>
      <ArrowLeft width={24} height={24} stroke={'black'}/>

      <div className='grid justify-center w-full gap-7 h-screen overflow-scroll no-scrollbar pb-20'>

        <div className='grid justify-items-center grid-rows-2 grid-cols-3 items-center'>
          <button className='rounded-full bg-dark-green h-12 w-12 row-start-1 row-end-1 self-end justify-self-end'>
            <GroupIcon width={28} height={28} fill='#FD8C77'/>
          </button>
          <div className='row-start-2 row-end-2 col-span-3'>
            <Avatar size={'lg'} rounded={true}/>
            <h1 className='justify-self-center font-concert-one text-xl text-text-dark-green'>{props.user?.displayName}</h1>
          </div>
          <button className='rounded-full bg-dark-green h-12 w-12 col-start-2 col-end-2'>
            <FriendsIcon width={26} height={26} fill='#FD8C77'/>
          </button>
          <button className='rounded-full bg-dark-green h-12 w-12 row-start-1 row-end-1 col-start-3 col-end-3 self-end justify-self-start'>
            <SendIcon width={28} height={28} stroke='#FD8C77' fill='none' />
          </button>
        </div>

        <div className='w-full m-auto'>
          <PostCard post={props}/>
        </div>

        <div className='grid gap-2'>
          <h3 className='font-concert-one text-lg text-text-dark-green'>Comments</h3>
          <AddCommentForm postId={id as string} loading={loading} commentsCount={props.commentsCount ?? 0}/>

          {
            props.comments && props.comments.map(comment => <CommentCard comment={comment} key={comment.normalizedDate}/>)
          }
        </div>

      </div>
    </>
    )
  }
}

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const { query: { id }, res } = context

//   const apiRes = await fetch(`http://localhost:3000/api/post/${id}`)

//   if (apiRes.ok) {
//     const props: PostCollection = await apiRes.json()
//     return { props }
//   }

//   if (res) {
//     res.writeHead(301, { location: '/home' }).end()
//   }
// }
