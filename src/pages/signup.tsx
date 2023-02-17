import ArrowLeft from 'components/Icons/ArrowLeft'
import { SignupForm } from 'components/SignupForm'
import { useAuth } from 'context/authUserContext'
import { useRouter } from 'next/router'

export default function Register () {
  const auth = useAuth()
  const router = useRouter()

  if (auth.authUser) router.push('/')

  return (
    <>
      <ArrowLeft width={24} height={24} stroke={'black'}/>
      <section className="w-full h-full grid place-content-center">
        <SignupForm />
      </section>
    </>
  )
}
