import { db } from '@firebase/client'
import { FriendCard } from 'components/FriendCard'
import { NavBarMobile } from 'components/NavBarMobile'
import { SideBarProfile } from 'components/SideBarProfile'
import { useAuth } from 'context/authUserContext'
import { collection } from 'firebase/firestore'
import { Carousel, Spinner, Tabs } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useCollection } from 'react-firebase-hooks/firestore'
import { UserCollection } from 'types/databaseTypes'

interface FriendsPageProp {
  userList?: UserCollection[]
}

export default function FriendsPage ({ userList }: FriendsPageProp) {
  const { authUser } = useAuth()
  const collectionUser = collection(db, 'users')
  const [value, loading, error] = useCollection<UserCollection>(collectionUser)

  if (error) return <p>There was an error...</p>

  if (loading) return <Spinner/>

  const snap = value?.docs.map(post => {
    const data = post.data()
    const { id } = post
    return { ...data, id }
  })

  const users = snap ?? userList ?? []
  const currentUser = users.find(user => user.id === authUser?.uid)
  const currentUserFriendsList = currentUser?.friends

  return (
    <>
      <SideBarProfile/>
      <section className='h-full grid justify-center w-full grid-rows-10'>
      <h1 className='text-3xl font-concert-one text-center h-0 row-span-1'>Friends</h1>

      <div className='row-span-3 font-concert-one'>
        <Tabs.Group style='underline' className='justify-center'>
          <Tabs.Item active={true} title='My friends'>
            <div className='h-72 w-80 bg-dark-green rounded-lg'>
              <Carousel slide={false} indicators={false}>
                {
                  currentUser?.friends?.length === 0
                    ? <p>You do not have any friends</p>
                    : users.filter(user => currentUserFriendsList?.includes(user.id as string)).map(user => (
                        <FriendCard
                          key={user.id}
                          displayName={`${user.firstName} ${user.lastName}`}
                          friendsCount={user.friendsCount ?? 0}
                          userId={user.id}
                          likesCount={user.likesCount ?? 0}
                          areWeFriends={true}
                        />))
                }
              </Carousel>
            </div>
          </Tabs.Item>

          <Tabs.Item title='Discover'>
            <div className='h-72 w-80 bg-dark-green rounded-lg'>
              <Carousel slide={false} indicators={false}>
                {
                  currentUser?.friends?.length !== users.length - 1
                    ? users.filter(user => user.id !== authUser?.uid && !currentUserFriendsList?.includes(user.id as string)).map(user => (
                    <FriendCard
                      key={user.id}
                      displayName={`${user.firstName} ${user.lastName}`}
                      friendsCount={user.friendsCount ?? 0}
                      userId={user.id}
                      likesCount={user.likesCount ?? 0}
                    />))
                    : <p>Congrats! You are friends with all the users in the app</p>
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
  const apiRes = await fetch('http://localhost:3000/api/users')
  if (apiRes.ok) {
    const props = await apiRes.json()
    const { users } = props
    const [usersList] = await Promise.all([users])
    return {
      props: {
        usersList
      }
    }
  }
}
