import { db } from '../../../../firebase/client'
import { CarosuelContainer } from 'components/CaroselContainer'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { MembersCard } from 'components/MembersCard'
import { NavBarMobile } from 'components/NavBarMobile'
import { useAuth } from 'context/authUserContext'
import { collection, doc } from 'firebase/firestore'
import { Spinner, Tabs } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { GroupCollecion, UserCollection } from 'types/databaseTypes'

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
    <>
      <ArrowLeft width={24} height={24} stroke={'black'}/>
      <h1 className='text-3xl text-text-dark-green font-concert-one text-center h-0 row-span-1'>Members</h1>

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

  const snapGroup = valueGroup?.data()
  const currentGroup = snapGroup ?? group
  const users = snap ?? usersList ?? []
  const isAdmin = currentGroup?.adminId === authUser?.uid
  const currentMembers = users.filter(user => currentGroup?.groupMembers?.includes(user.id as string))
  const joinRequestMembers = users.filter(user => currentGroup?.joinRequests?.includes(user.id as string))

  return (
    <>

      <ArrowLeft width={24} height={24} stroke={'black'}/>

      <section className='h-full grid justify-center w-full grid-rows-10'>
        <h1 className='text-3xl text-text-dark-green font-concert-one text-center h-0 row-span-1'>Members</h1>

        <div className='row-span-3 font-concert-one'>
          <Tabs.Group style='underline' className='justify-center'>
            <Tabs.Item active={true} title='Current Members'>
              <CarosuelContainer>
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
                  />))
              }
              </CarosuelContainer>
            </Tabs.Item>

            {
                isAdmin
                  ? <Tabs.Item title='Join Requests'>
                    <CarosuelContainer>
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
                          />))
                      }
                    </CarosuelContainer>
                  </Tabs.Item>
                  : ''
            }

          </Tabs.Group>
        </div>

      </section>

      <NavBarMobile/>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id } = context.query
  const [apiUsers, apiGroup] = await Promise.all([
    fetch(`${process.env.API_URL}/api/users`),
    fetch(`${process.env.API_URL}/api/group/${id}`)
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
