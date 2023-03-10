import { db } from '../../../firebase/client'
import { ListCardsContainer } from 'components/ListCardsContainer'
import { CreateGroupModal } from 'components/CreateGroupModal'
import { GroupCard } from 'components/GroupCard'
import { NavBarMobile } from 'components/NavBarMobile'
import { SideBarProfile } from 'components/SideBarProfile'
import { useAuth } from 'context/authUserContext'
import { collection, doc } from 'firebase/firestore'
import { Spinner, Tabs } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { GroupCollecion, UserCollection } from 'types/databaseTypes'

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
      <h1 className='font-concert-one text-3xl text-center row-span-1 text-text-dark-green'>Groups</h1>
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

  const groups = snap ?? groupsList ?? []
  const loggedUserGroups = groups.filter(group => !group.groupMembers?.includes(authUser?.uid as string))
  const currentUserGroups = groups.filter(group => group.groupMembers?.includes(id as string))
  const firstTabTitle = authUser?.uid === id ? 'My groups' : `${userSnap?.firstName}'s groups`

  return (
    <>
      <SideBarProfile/>
      <section className='h-full grid justify-center w-full grid-rows-10'>
        <h1 className='font-concert-one text-3xl text-center row-span-1 text-text-dark-green'>Groups</h1>

        <div className='row-span-3 flex flex-col items-center font-concert-one'>
          <button className='w-3/5 bg-dark-green rounded-full pb-2 text-ligth-text-green' onClick={() => setShowModal(true)}>Create group</button>
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
        </div>

      </section>

      <CreateGroupModal setShowModal={setShowModal} showModal={showModal}/>

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
