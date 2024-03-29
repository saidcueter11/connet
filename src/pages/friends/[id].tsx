import { db } from '../../../firebase/client'
import { ListCardsContainer } from 'components/Utils/ListCardsContainer'
import { FriendCard } from 'components/Friends/FriendCard'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { useAuth } from 'context/authUserContext'
import { collection } from 'firebase/firestore'
import { Tabs } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import { UserCollection } from 'types/databaseTypes'
import { FriendsHeader } from 'components/Friends/FriendsHeader'
import { SideBarContainer } from 'components/SideBars/SideBarContainer'
import { MainPageLayout } from 'components/Utils/MainPageLayout'
import { PageContenLayout } from 'components/Utils/PageContenLayout'

export default function FriendsPage ({ userId }: {userId: string}) {
  const { authUser } = useAuth()
  const router = useRouter()
  const id = router.query.id ?? userId
  const collectionUser = collection(db, 'users')
  const [value] = useCollection<UserCollection>(collectionUser)

  const snap = value?.docs.map(post => {
    const data = post.data()
    const { id } = post
    return { ...data, id }
  })

  const users = snap ?? []
  const currentUser = users.find(user => user.id === id)
  const loggedUser = users.find(user => user.id === authUser?.uid)
  const currentUserFriendsList = currentUser?.friends
  const loggedUserFriendsList = loggedUser?.friends
  const firstTabTitle = authUser?.uid === id ? 'My Friends' : `${currentUser?.firstName}'s Friends`
  const loggedUserUserListFriends = users.filter(user => currentUserFriendsList?.includes(user.id as string))
  const dicoverNewUsersList = users.filter(user => user.id !== id && !loggedUserFriendsList?.includes(user.id as string) && user.id !== authUser?.uid)

  const areWeFriends = (userId: string) => loggedUserFriendsList?.includes(userId)

  return (
    <>
      {
        loggedUser?.id === currentUser?.id
          ? <SideBarContainer/>
          : <ArrowLeft width={24} height={24} stroke={'black'}/>
      }

      <MainPageLayout>
        <FriendsHeader/>
        <PageContenLayout>
          <Tabs.Group style='underline' className='justify-center list-continer font-concert-one'>
            <Tabs.Item active={true} title={firstTabTitle}>
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
                          avatar={user.avatar}
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
                          avatar={user.avatar}
                        />))
                    }
                  </ListCardsContainer>
              }
            </Tabs.Item>
          </Tabs.Group>
        </PageContenLayout>

      </MainPageLayout>

    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id } = context.query
  return { props: { userdId: id } }
}
