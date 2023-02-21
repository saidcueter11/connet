import { getLastestPosts } from '@firebase/client'
import { HeaderMobile } from 'components/HeaderMobile'
import { NavBarMobile } from 'components/NavBarMobile'
import { PostCard } from 'components/PostCard'
import { SideBarNotifications } from 'components/SideBarNotifications'
import { SideBarProfile } from 'components/SideBarProfile'
import { useAuth } from 'context/authUserContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PostCollection } from 'types/databaseTypes'

export default function Home () {
  const [toggleSideBarNotifications, setToggleSideBarNotifications] = useState(false)
  const [toggleSideBarProfile, setToggleSideBarProfile] = useState(false)
  const [posts, setPosts] = useState<PostCollection[]>([])

  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.authUser) router.push('/login')

    if (auth.authUser) {
      const unsub = getLastestPosts(setPosts)
      return () => unsub && unsub()
    }
  }, [auth.authUser])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBarProfile isNotificationOpen={toggleSideBarNotifications} isOpen={setToggleSideBarProfile}/>
      <SideBarNotifications isProfileOpen={toggleSideBarProfile} toggle={toggleSideBarNotifications} onToggle={setToggleSideBarNotifications}/>
      <main className='w-full h-screen'>
        <HeaderMobile/>

        <div className='flex flex-col gap-4 h-screen overflow-scroll no-scrollbar'>
          {
            posts && posts.map(post => (
              <PostCard
                post={post}
                key={post.id}
              />
            ))
          }

          <div className='p-6 h-32'></div>
          <div className='p-6 h-32'></div>
          <div className='p-6 h-32'></div>
        </div>

      </main>

      <NavBarMobile onNotificationClick={setToggleSideBarNotifications} isProfileOpen={toggleSideBarProfile}/>
    </>
  )
}
