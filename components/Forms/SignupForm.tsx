import { auth, db } from '@firebase/client'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { Label, TextInput, Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { UserCollection } from 'types/databaseTypes'
import { ProgressBar } from './ProgressBar'

export const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  let errorMessage = ''

  const router = useRouter()

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error
  ] = useCreateUserWithEmailAndPassword(auth)

  const handleSubmit = (e:SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password === confirmPassword) {
      setErrorPassword('')
      createUserWithEmailAndPassword(email, password).then(userCredential => {
        const user = userCredential?.user
        const uid = user?.uid ?? ''

        const userDocRef = doc(db, 'users', uid)
        const userData: UserCollection = {
          email,
          firstName,
          lastName,
          username,
          avatar: user?.photoURL ?? ''
        }

        setDoc(userDocRef, userData)
      }).catch(e => {
        errorMessage = e
      })
    } else {
      setErrorPassword('Password confirmation does not match')
    }
  }

  if (user?.user) {
    updateProfile(user.user, { displayName: `${firstName} ${lastName}|${username}` })
    router.replace('/')
  }

  if (error) {
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'The email provided already exists'
    } else if (error.code === 'auth/internal-error') {
      errorMessage = 'There was an error, please make sure you are filling all the fields'
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Your password it's too weak. Please use at least 6 characters"
    }
  }

  const onInvalidEmail = () => {
    setErrorEmail('Please enter the correct email pattern. Must be @contestogac.on.ca')
  }

  return (
    <>
      <form className='flex flex-col gap-4 items-center font-karla w-96' onSubmit={handleSubmit}>
        <div className='w-3/5'>
          <div className="mb-2 block">
            <Label className='font-concert-one' htmlFor="firstName" value="First Name"/>
          </div>
          <TextInput id='firstName' type='text' value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='Jon' required={true}/>
        </div>

        <div className='w-3/5'>
          <div className="mb-2 block">
            <Label className='font-concert-one' htmlFor="lastName" value="Last Name"/>
          </div>
          <TextInput id='lastName' value={lastName} type='text' onChange={e => setLastName(e.target.value)} placeholder='Jon' required={true}/>
        </div>

        <div className='w-3/5'>
          <div className="mb-2 block">
            <Label className='font-concert-one' htmlFor="username" value="Username"/>
          </div>
          <TextInput id='username' value={username} onChange={e => setUsername(e.target.value)} type='text' placeholder='Jon' required={true}/>
        </div>

        <div className='w-3/5'>
          <div className="mb-2 block">
            <Label className='font-concert-one' htmlFor="email" value="Email"/>
          </div>
          <TextInput id='email' onInvalid={onInvalidEmail} pattern='^[a-zA-Z0-9._%+-]+@conestogac\.on\.ca$' type='email' value={email} placeholder='example@email.com' onChange={e => setEmail(e.target.value)} required={true}/>
        </div>

        <div className='w-3/5'>
          <div className="mb-2 block">
            <Label className='font-concert-one' htmlFor="password" value="Password"/>
          </div>
          <TextInput id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} required={true}/>
          <ProgressBar password={password}/>
        </div>

        <div className='w-3/5'>
          <div className="mb-2 block">
            <Label className='font-concert-one' htmlFor="confirmedPassword" value="Confirm Password"/>
          </div>
          <TextInput id='confirmedPassword' type='password' value={confirmPassword} required={true} onChange={e => setconfirmPassword(e.target.value)}/>
        </div>

        {
          (error && errorPassword.length === 0) && <p className='text-sm text-action-red font-semibold font-karla text-center w-4/5'>{errorMessage}</p>
        }

        {
          errorPassword.length > 0 && <p className='text-sm text-action-red font-semibold font-karla text-center w-4/5'>{errorPassword}</p>
        }

        {
          errorEmail && <p className='text-sm text-action-red font-semibold font-karla text-center w-4/5'>{errorEmail}</p>
        }

        <button className='text-[#F3F4ED] bg-dark-green border border-transparent hover:bg-dark-green/80 flex items-center justify-center p-2 text-center font-semibold font-karla rounded-lg w-3/5'>
        {
            loading
              ? <Spinner aria-label="Default status example" />
              : 'Register'
          }
        </button>

      </form>

    </>

  )
}
