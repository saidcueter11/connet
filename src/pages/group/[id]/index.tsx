import { getLastestGroupPosts } from '@firebase/client'
import { GroupHeader } from 'components/Group/GroupHeader'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { PostCard } from 'components/Posts/PostCard'
import { useAuth } from 'context/authUserContext'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { GroupCollecion, GroupPostCollection } from 'types/databaseTypes'
import { MainPageLayout } from 'components/Utils/MainPageLayout'
import { PageContenLayout } from 'components/Utils/PageContenLayout'

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

  const props = posts ?? groupPosts ?? []

  const sortedPosts = props.sort((a, b) => {
    if (a.createdAt && b.createdAt) { if (a.createdAt < b.createdAt) return 1 }
    return -1
  })

  return (
    <MainPageLayout>
      <ArrowLeft width={24} height={24} stroke={'black'}/>
      <PageContenLayout>
        <GroupHeader
          groupName={group.groupName}
          groupId={id}
          groupDescription={group.description}
          groupMembers={group.groupMembers}
          joinRequest={group.joinRequests}
          adminId={group.adminId}
          privacy={group.privacy}
        />

        <div className='flex flex-col gap-4'>
          {
            sortedPosts.map(post => <PostCard post={post} key={post.id}/>)
          }
        </div>
      </PageContenLayout>
    </MainPageLayout>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id } = context.query
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/${id}`)
  if (apiRes.ok) {
    const res = await apiRes.json()
    const { group, data } = res
    const [groupPosts] = await Promise.all([data])
    return { props: { groupPosts, id, group } }
  }
}
