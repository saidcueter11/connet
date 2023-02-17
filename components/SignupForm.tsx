import { auth } from '@firebase/client'
import { Label, TextInput, Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'

export const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error
  ] = useCreateUserWithEmailAndPassword(auth)

  const handleSubmit = () => {
    createUserWithEmailAndPassword(email, password)
    router.replace('/')
  }

  if (error) {
    return <p>There was an error</p>
  }

  if (loading) return <p>Loading...</p>

  if (user) return <p>user {user.user.displayName}</p>

  return (
    <form className='flex flex-col gap-4 items-center'>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="First Name"/>
        </div>
        <TextInput id='firstName' type='text' placeholder='Jon' required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastName" value="Last Name"/>
        </div>
        <TextInput id='lastName' type='text' placeholder='Jon' required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username"/>
        </div>
        <TextInput id='username' type='text' placeholder='Jon' required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email"/>
        </div>
        <TextInput id='email' type='email' value={email} placeholder='example@email.com' onChange={e => setEmail(e.target.value)} required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password"/>
        </div>
        <TextInput id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirmedPassword" value="Confirm Password"/>
        </div>
        <TextInput id='confirmedPassword' type='password' required={true}/>
      </div>

      <Button onClick={handleSubmit} className='bg-[#09f] w-full'>Register</Button>
    </form>
  )
}
