import { db } from '../../../firebase/client'
import { ListCardsContainer } from 'components/Utils/ListCardsContainer'
import { FriendCard } from 'components/Utils/FriendCard'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { NavBarMobile } from 'components/Utils/NavBarMobile'
import { SideBarProfile } from 'components/SideBars/SideBarProfile'
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
  const loggedUserUserListFriends = users.filter(user => currentUserFriendsList?.includes(user.id as string))
  const dicoverNewUsersList = users.filter(user => user.id !== id && !currentUserFriendsList?.includes(user.id as string) && user.id !== authUser?.uid)

  const areWeFriends = (userId: string) => loggedUserFriendsList?.includes(userId)

  return (
    <>

      {
        loggedUser?.id === currentUser?.id
          ? <SideBarProfile/>
          : <ArrowLeft width={24} height={24} stroke={'black'}/>
      }
      <section className='h-full grid justify-center w-full grid-rows-10'>
        <h1 className='text-3xl text-text-dark-green font-concert-one text-center h-0 row-span-1 w-full'>Friends</h1>

        <div className='row-span-3 font-concert-one w-full'>
          <Tabs.Group style='underline' className='justify-center'>
            <Tabs.Item active={true} title={firstTabTitle} className='h-full'>
            {
              currentUser?.friends?.length === 0
                ? <p className='h-[26rem] text-center text-text-dark-green text-xl'>You have not added any friends. Go to the discover page and add some</p>
                : <ListCardsContainer>
                    {
                      loggedUserUserListFriends.map(user => (
                        <FriendCard
                          key={user.id}
                          displayName={`${user.firstName} ${user.lastName}`}
                          friendsCount={user.friendsCount ?? 0}
                          userId={user.id}
                          likesCount={user.likesCount ?? 0}
                          areWeFriends={areWeFriends(user.id as string)}
                        />))
                    }
                  </ListCardsContainer>
            }
            </Tabs.Item>

            <Tabs.Item title='Discover'>
            {
              loggedUserFriendsList?.length === users.length - 1
                ? <p>Congrats! You are friends with all the users in the app</p>
                : <ListCardsContainer>
                    {
                      dicoverNewUsersList.map(user => (
                        <FriendCard
                          key={user.id}
                          displayName={`${user.firstName} ${user.lastName}`}
                          friendsCount={user.friendsCount ?? 0}
                          userId={user.id}
                          likesCount={user.likesCount ?? 0}
                          areWeFriends={areWeFriends(user.id as string)}
                        />))
                    }
                  </ListCardsContainer>
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
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
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
