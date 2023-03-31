import { loginWithEmail } from '@firebase/client'
import { TextInput, Label } from 'flowbite-react'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'

export const LoginForm = () => {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e:SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginWithEmail(email, password)
      .catch(error => {
        setError(error)
      })
  }

  return (
    <form className='flex flex-col gap-4 items-center w-full' onSubmit={(e) => handleLogin(e)}>
      <div className='w-full'>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email"/>
        </div>
        <TextInput id='email' value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='example@email.com' required={true} />
      </div>

      <div className='w-full'>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password"/>
        </div>
        <TextInput id='password' value={password} onChange={e => setPassword(e.target.value)} type='password' required={true}/>
      </div>

      <button id='btnSignIn' className='text-[#F3F4ED] bg-dark-green border border-transparent hover:bg-dark-green/80 flex items-center justify-center p-2 text-center font-semibold font-karla rounded-lg w-full'>Sign In</button>

      {
        error &&
        <div className='text-center'>
          <p id="incorrectInfoMessage" className='text-sm text-action-red font-semibold font-karla'>Your email/password are incorrect. Try again</p>
        </div>
      }

      <p className='text-sm font-karla text-center'>You do not have an account?</p>
      <Link href='/signup' >
        <button id='btnGoToRegister' className='text-[#F3F4ED] bg-dark-green border border-transparent hover:bg-dark-green/80 flex items-center justify-center px-4 font-karla py-2 text-center font-semibold rounded-lg w-full'>Register</button>
      </Link>
    </form>
  )
}
