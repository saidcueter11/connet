import { db } from '../../../firebase/client'
import { ListCardsContainer } from 'components/Utils/ListCardsContainer'
import { GroupCard } from 'components/Group/GroupCard'
import { NavBarMobile } from 'components/Utils/NavBarMobile'
import { SideBarProfile } from 'components/SideBars/SideBarProfile'
import { useAuth } from 'context/authUserContext'
import { collection, doc } from 'firebase/firestore'
import { Spinner, Tabs } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { GroupCollecion, UserCollection } from 'types/databaseTypes'
import { GroupsHeader } from 'components/Group/GroupsHeader'
import ArrowLeft from 'components/Icons/ArrowLeft'

interface GroupsPageProps {
  groupsList: GroupCollecion[]
}

export default function GroupsPage ({ groupsList }: GroupsPageProps) {
  const { authUser } = useAuth()
  const router = useRouter()
  const { id } = router.query
  const [showModal, setShowModal] = useState(false)
  const collectionGroups = collection(db, 'groups')
  const docRef = doc(db, 'users', id as string)
  const [value, loading, error] = useCollection<GroupCollecion>(collectionGroups)
  const [valueCurrentUser, loadingCurrentUser, errorCurrentUser] = useDocument<UserCollection>(docRef)

  if (error || errorCurrentUser) return <p>There was an error...</p>

  if (loading || loadingCurrentUser) {
    return (
    <>
      <SideBarProfile/>
      <GroupsHeader setShowModal={setShowModal} showModal={showModal}/>
      <Spinner/>
      <NavBarMobile/>
    </>
    )
  }

  const snap = value?.docs.map(doc => {
    const data = doc.data()
    const { id } = doc
    return { ...data, id }
  })

  const userSnap = valueCurrentUser?.data()
  const userId = valueCurrentUser?.id

  const groups = snap ?? groupsList ?? []
  const loggedUserGroups = groups.filter(group => !group.groupMembers?.includes(authUser?.uid as string))
  const currentUserGroups = groups.filter(group => group.groupMembers?.includes(id as string))
  const firstTabTitle = authUser?.uid === id ? 'My groups' : `${userSnap?.firstName}'s groups`

  return (
    <>
      {
        userId === authUser?.uid
          ? <SideBarProfile/>
          : <ArrowLeft width={24} height={24} stroke={'black'}/>
      }
      <main className='h-screen'>
        <GroupsHeader setShowModal={setShowModal} showModal={showModal}/>

        <section className='h-screen font-concert-one w-full grid justify-center items-start'>
          <Tabs.Group style='underline' className='justify-center'>
            <Tabs.Item active={true} title={firstTabTitle}>
              <ListCardsContainer>
                {
                  currentUserGroups.map(group => (
                    <GroupCard
                      key={group.id}
                      groupId={group.id ?? ''}
                      adminId={group.adminId ?? ''}
                      groupName={group.groupName ?? ''}
                      likesCount={group.likesCount ?? 0}
                      membersCount={group.membersCount ?? 0}
                      groupMembers={group.groupMembers ?? []}
                      privacy={group.privacy ?? ''}
                      joinRequests={group.joinRequests || []}
                    />))
                }
              </ListCardsContainer>

            </Tabs.Item>

            <Tabs.Item title='Discover'>
              <ListCardsContainer>
                {
                  loggedUserGroups.map(group => (
                    <GroupCard
                      key={group.id}
                      groupId={group.id ?? ''}
                      adminId={group.adminId ?? ''}
                      groupName={group.groupName ?? ''}
                      likesCount={group.likesCount ?? 0}
                      membersCount={group.membersCount ?? 0}
                      groupMembers={group.groupMembers ?? []}
                      privacy={group.privacy ?? ''}
                      joinRequests={group.joinRequests || []}
                    />))
                }
              </ListCardsContainer>
            </Tabs.Item>
          </Tabs.Group>
        </section>

      </main>

      <NavBarMobile/>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`)
  if (apiRes.ok) {
    const props = await apiRes.json()
    const { groups } = props
    const [groupsList] = await Promise.all([groups])
    return {
      props: {
        groupsList
      }
    }
  }
}
