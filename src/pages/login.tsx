import { LoginForm } from 'components/LoginForm'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'

export default function Login () {
  const auth = useAuth()
  const router = useRouter()

  if (auth.authUser) router.push('/')

  console.log({ auth })

  return (
    <>
      <section className="w-full h-full grid place-content-center">
        <LoginForm/>
      </section>
    </>
  )
}
