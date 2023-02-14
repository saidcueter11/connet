import { loginWithEmail } from '@firebase/client'
import { Button, TextInput, Label } from 'flowbite-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    loginWithEmail(email, password)
    router.replace('/')
  }

  return (
    <form className='flex flex-col gap-4 items-center'>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email"/>
        </div>
        <TextInput id='email' value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='example@email.com' required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password"/>
        </div>
        <TextInput id='password' value={password} onChange={e => setPassword(e.target.value)} type='password' required={true}/>
      </div>

      <Button onClick={handleLogin} className='bg-black w-full'>Submit</Button>
      <p className='text-sm'>You do not have an account?</p>
      <Link href='/signup' >
        <Button>Register</Button>
      </Link>
    </form>
  )
}
