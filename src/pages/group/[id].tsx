import { getLastestGroupPosts } from '@firebase/client'
import { GroupHeader } from 'components/GroupHeader'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { NavBarMobile } from 'components/NavBarMobile'
import { PostCard } from 'components/PostCard'
import { useAuth } from 'context/authUserContext'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { GroupCollecion, GroupPostCollection } from 'types/databaseTypes'

interface GroupPageProps {
  groupPosts: GroupPostCollection[],
  id: string,
  group: GroupCollecion
}

export default function GroupPage ({ groupPosts, id, group }: GroupPageProps) {
  const auth = useAuth()
  const [posts, setPosts] = useState<GroupPostCollection[]>([])

  useEffect(() => {
    if (auth.authUser) {
      const unsub = getLastestGroupPosts(setPosts, id)
      return () => unsub && unsub()
    }
  }, [auth.authUser])

  const sortedPosts = posts.sort((a, b) => {
    if (a.createdAt && b.createdAt) { if (a.createdAt < b.createdAt) return 1 }
    return -1
  })

  return (
    <>
      <ArrowLeft width={24} height={24} stroke={'black'}/>
      <section className='h-screen overflow-y-scroll no-scrollbar pb-36'>
        <GroupHeader groupName={group.groupName as string} groupId={id} groupDescription={group.description} groupMembers={group.groupMembers}/>

        <div className='flex flex-col gap-4 pt-10'>
          {
            sortedPosts.map(post => <PostCard post={post} key={post.id}/>)
          }
        </div>
      </section>
      <NavBarMobile/>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id } = context.query
  const apiRes = await fetch(`http://localhost:3000/api/group/${id}`)
  if (apiRes.ok) {
    const res = await apiRes.json()
    const { group, data } = res
    const [groupPosts] = await Promise.all([data])
    return { props: { groupPosts, id, group } }
  }
}
