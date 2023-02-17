import { logoutWithEmail } from '@firebase/client'
import { PostCard } from 'components/PostCard'
import { useAuth } from 'context/authUserContext'
import { Card } from 'flowbite-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home () {
  const auth = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logoutWithEmail()
    router.push('/login')
  }

  useEffect(() => {
    if (!auth.authUser) router.push('/login')
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-full h-screen'>
        <PostCard/>
        <PostCard/>
        <PostCard/>

        <Card>
          <h1>Hola</h1>
          <button onClick={handleLogout}>Logout</button>
        </Card>
      </main>
    </>
  )
}
