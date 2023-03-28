import { db } from '../../../../firebase/client'
import { ListCardsContainer } from 'components/Utils/ListCardsContainer'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { MembersCard } from 'components/Group/MembersCard'
import { NavBarMobile } from 'components/Utils/NavBarMobile'
import { useAuth } from 'context/authUserContext'
import { collection, doc } from 'firebase/firestore'
import { Tabs } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { GroupCollecion, UserCollection } from 'types/databaseTypes'
import { MembersHeader } from 'components/Group/MembersHeader'
import { MainPageLayout } from 'components/Utils/MainPageLayout'
import { PageContenLayout } from 'components/Utils/PageContenLayout'

interface FriendsPageProp {
  usersList?: UserCollection[]
  group?: GroupCollecion
}

export default function MembersPage ({ usersList, group }: FriendsPageProp) {
  const { authUser } = useAuth()
  const router = useRouter()
  const { id } = router.query
  const collectionUser = collection(db, 'users')
  const docGroup = doc(db, 'groups', id as string)
  const [valueGroup, loadingGroup, errorGroup] = useDocument<GroupCollecion>(docGroup)
  const [value, loading, error] = useCollection<UserCollection>(collectionUser)

  if (error || errorGroup) return <p>There was an error...</p>

  if (loading || loadingGroup) {
    return (
    <MainPageLayout></MainPageLayout>
    )
  }

  const snap = value?.docs.map(post => {
    const data = post.data()
    const { id } = post
    return { ...data, id }
  })

  const snapGroup = valueGroup?.data()
  const currentGroup = snapGroup ?? group
  const users = snap ?? usersList ?? []
  const isAdmin = currentGroup?.adminId === authUser?.uid
  const currentMembers = users.filter(user => currentGroup?.groupMembers?.includes(user.id as string))
  const joinRequestMembers = users.filter(user => currentGroup?.joinRequests?.includes(user.id as string))

  return (
    <>

      <ArrowLeft width={24} height={24} stroke={'black'}/>

      <MainPageLayout>
        <MembersHeader/>

        <PageContenLayout>
          <Tabs.Group style='underline' className='justify-center font-concert-one list-continer'>
            <Tabs.Item active={true} title='Current Members'>
              <ListCardsContainer>
              {
                currentMembers.map(user => (
                  <MembersCard
                    key={user.id}
                    displayName={`${user.firstName} ${user.lastName}`}
                    friendsCount={user.friendsCount ?? 0}
                    userId={user.id}
                    likesCount={user.likesCount ?? 0}
                    isMember={true}
                    groupId={id as string}
                    isAdmin={isAdmin}
                    avatar={user.avatar}
                  />))
              }
              </ListCardsContainer>
            </Tabs.Item>

            {
                isAdmin
                  ? <Tabs.Item title='Join Requests'>
                    {
                      joinRequestMembers.length > 0
                        ? <ListCardsContainer>
                        {
                          joinRequestMembers.map(user => (
                            <MembersCard
                              key={user.id}
                              displayName={`${user.firstName} ${user.lastName}`}
                              friendsCount={user.friendsCount ?? 0}
                              userId={user.id}
                              likesCount={user.likesCount ?? 0}
                              isMember={false}
                              groupId={id as string}
                              avatar={user.avatar}
                            />))
                        }
                      </ListCardsContainer>
                        : <p className='h-[26rem] text-text-dark-green text-center text-lg'>There are no request at the momment</p>
                    }
                  </Tabs.Item>
                  : ''
            }

          </Tabs.Group>
        </PageContenLayout>

      </MainPageLayout>

      <NavBarMobile/>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id } = context.query
  const [apiUsers, apiGroup] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/${id}`)
  ])
  if (apiUsers.ok && apiGroup.ok) {
    const [propsUsers, propsGroup] = await Promise.all([
      apiUsers.json(),
      apiGroup.json()
    ])
    const { users } = propsUsers
    const { group } = propsGroup
    const [usersList] = await Promise.all([users])
    return {
      props: {
        usersList,
        group
      }
    }
  }
}
