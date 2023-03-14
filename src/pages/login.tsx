import { LoginForm } from 'components/Forms/LoginForm'
import { useAuth } from 'context/authUserContext'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Login () {
  const auth = useAuth()
  const router = useRouter()

  if (auth.authUser) router.push('/')

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-full h-full grid place-content-center">
        <img className='object-cover' src='logo.png'/>
        <LoginForm/>
      </section>
    </>
  )
}
