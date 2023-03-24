import { LoginForm } from 'components/Forms/LoginForm'
import { useAuth } from 'context/authUserContext'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Login () {
  const auth = useAuth()
  const router = useRouter()

  if (auth.isAuthenticated) {
    console.log({ auth })
    const redirectUrl = localStorage.getItem('redirectUrl')
    router.push(redirectUrl ?? '/')
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-full h-full grid place-content-center gap-2">
        <img className='w-3/4 object-cover mx-auto' src='logo.png'/>
        <LoginForm/>
      </section>
    </>
  )
}
