import { auth } from '@firebase/client'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { SignupForm } from 'components/SignupForm'
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'

export default function Register () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error
  ] = useCreateUserWithEmailAndPassword(auth)

  if (error) {
    return <p>There was an error</p>
  }

  if (loading) return <p>Loading...</p>

  if (user) return <p>user {user.user.displayName}</p>
  return (
    <>
      <ArrowLeft width={24} height={24} stroke={'black'}/>
      <section className="w-full h-full grid place-content-center">
        <SignupForm email={email} password={password} handleSignup={createUserWithEmailAndPassword} handleEmail={setEmail} handlePassword={setPassword}/>
      </section>
    </>
  )
}
