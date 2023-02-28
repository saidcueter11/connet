import { db } from '@firebase/client'
import { FriendCard } from 'components/FriendCard'
import { NavBarMobile } from 'components/NavBarMobile'
import { SideBarProfile } from 'components/SideBarProfile'
import { collection, doc } from 'firebase/firestore'
import { Carousel, Spinner, Tabs } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { UserCollection } from 'types/databaseTypes'

interface FriendsPageProp {
  userList?: UserCollection[]
  id?: string
}

export default function FriendsPage ({ userList, id }: FriendsPageProp) {
  const router = useRouter()
  const userId = router.query.id ?? id
  const collectionUser = collection(db, 'users')
  const docUser = doc(collectionUser, userId as string)
  const [value, loading, error] = useDocument<UserCollection>(docUser)
  const [valueAllUsers, loadingAllUsers, errorAllUsers] = useCollection<UserCollection>(collectionUser)

  if (error || errorAllUsers) return <p>There was an error...</p>

  if (loading || loadingAllUsers) return <Spinner/>

  const snap = valueAllUsers?.docs.map(post => {
    const data = post.data()
    const { id } = post
    return { ...data, id }
  })

  const users = snap ?? userList ?? []
  const currentUser = value?.data()

  return (
    <>
      <SideBarProfile/>
      <section className='h-full grid justify-center w-full grid-rows-10'>
      <h1 className='text-3xl font-concert-one text-center h-0 row-span-1'>Friends</h1>

      <div className='row-span-3 font-concert-one'>
        <Tabs.Group style='underline' className='justify-center'>
          <Tabs.Item active={true} title='My friends' style={{ color: 'white' }} role='tab'>
            <div className='h-72 w-80 bg-dark-green rounded-lg'>
              <Carousel slide={false} indicators={false}>

              </Carousel>
            </div>
          </Tabs.Item>

          <Tabs.Item title='Discover'>
            <div className='h-72 w-80 bg-dark-green rounded-lg'>
              <Carousel slide={false} indicators={false}>
                {
                  users.filter(user => user.id !== id).map(user => <FriendCard displayName={`${user.firstName} ${user.lastName}`} friendsCount={user.friendsCount ?? 0} userId={user.id} key={user.id} likesCount={user.likesCount ?? 0}/>)
                }
              </Carousel>
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </div>

      </section>

       <NavBarMobile/>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id } = context.query
  const apiRes = await fetch(`http://localhost:3000/api/users/${id}`)
  if (apiRes.ok) {
    const props = await apiRes.json()
    const { users, id } = props
    const [usersList] = await Promise.all([users])
    return {
      props: {
        usersList, id
      }
    }
  }
}
