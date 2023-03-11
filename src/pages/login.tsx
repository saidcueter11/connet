import { LoginForm } from 'components/Forms/LoginForm'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'

export default function Login () {
  const auth = useAuth()
  const router = useRouter()

  if (auth.authUser) router.push('/')

  return (
    <>
      <section className="w-full h-full grid place-content-center">
        <LoginForm/>
      </section>
    </>
  )
}
