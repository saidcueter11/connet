import { db } from '../../../firebase/client'
import { CarosuelContainer } from 'components/CaroselContainer'
import { FriendCard } from 'components/FriendCard'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { NavBarMobile } from 'components/NavBarMobile'
import { SideBarProfile } from 'components/SideBarProfile'
import { useAuth } from 'context/authUserContext'
import { collection } from 'firebase/firestore'
import { Spinner, Tabs } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import { UserCollection } from 'types/databaseTypes'

interface FriendsPageProp {
  userList?: UserCollection[]
}

export default function FriendsPage ({ userList }: FriendsPageProp) {
  const { authUser } = useAuth()
  const router = useRouter()
  const { id } = router.query
  const collectionUser = collection(db, 'users')
  const [value, loading, error] = useCollection<UserCollection>(collectionUser)

  if (error) return <p>There was an error...</p>

  if (loading) {
    return (
    <>
      <SideBarProfile/>
      <h1 className='text-3xl text-text-dark-green font-concert-one text-center h-0 row-span-1'>Friends</h1>

      <Spinner/>
      <NavBarMobile/>
    </>
    )
  }

  const snap = value?.docs.map(post => {
    const data = post.data()
    const { id } = post
    return { ...data, id }
  })

  const users = snap ?? userList ?? []
  const currentUser = users.find(user => user.id === id)
  const loggedUser = users.find(user => user.id === authUser?.uid)
  const currentUserFriendsList = currentUser?.friends
  const loggedUserFriendsList = loggedUser?.friends
  const firstTabTitle = authUser?.uid === id ? 'My Friends' : `${currentUser?.firstName}'s Friends`

  return (
    <>

      {
        loggedUser?.id === currentUser?.id
          ? <SideBarProfile/>
          : <ArrowLeft width={24} height={24} stroke={'black'}/>
      }
      <section className='h-full grid justify-center w-full grid-rows-10'>
        <h1 className='text-3xl text-text-dark-green font-concert-one text-center h-0 row-span-1'>Friends</h1>

        <div className='row-span-3 font-concert-one'>
          <Tabs.Group style='underline' className='justify-center'>
            <Tabs.Item active={true} title={firstTabTitle}>
            {
              currentUser?.friends?.length === 0
                ? <p>You do not have any friends</p>
                : <CarosuelContainer>
                    {
                      users.filter(user => currentUserFriendsList?.includes(user.id as string)).map(user => (
                        <FriendCard
                          key={user.id}
                          displayName={`${user.firstName} ${user.lastName}`}
                          friendsCount={user.friendsCount ?? 0}
                          userId={user.id}
                          likesCount={user.likesCount ?? 0}
                          areWeFriends={true}
                        />))
                    }
                  </CarosuelContainer>
            }
            </Tabs.Item>

            <Tabs.Item title='Discover'>
            {
              loggedUserFriendsList?.length === users.length - 1
                ? <p>Congrats! You are friends with all the users in the app</p>
                : <CarosuelContainer>
                    {
                      users.filter(user => user.id !== id && !currentUserFriendsList?.includes(user.id as string) && user.id !== authUser?.uid).map(user => (
                        <FriendCard
                          key={user.id}
                          displayName={`${user.firstName} ${user.lastName}`}
                          friendsCount={user.friendsCount ?? 0}
                          userId={user.id}
                          likesCount={user.likesCount ?? 0}
                          areWeFriends={loggedUserFriendsList?.includes(user.id as string)}
                        />))
                    }
                  </CarosuelContainer>
              }
            </Tabs.Item>
          </Tabs.Group>
        </div>

      </section>

      <NavBarMobile/>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const apiRes = await fetch(`${process.env.API_URL}/api/users`)
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
