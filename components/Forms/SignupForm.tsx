import { auth, db, uploadImage } from '@firebase/client'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { Label, TextInput, Spinner, Dropdown, Avatar } from 'flowbite-react'
import { useRouter } from 'next/router'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { UserCollection } from 'types/databaseTypes'
import { ProgressBar } from './ProgressBar'
import { programs } from 'helpers/listOfPrograms'
import { UploadTask, getDownloadURL } from 'firebase/storage'

export const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [program, setProgram] = useState('Pick a program')
  const [imgUrl, setImgUrl] = useState('')
  const [imgLoading, setImgLoading] = useState(false)
  const [task, setTask] = useState<UploadTask>()
  const [errorPassword, setErrorPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [erroProgram, setErrorProgram] = useState('')

  let errorMessage = ''

  const router = useRouter()

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error
  ] = useCreateUserWithEmailAndPassword(auth)

  const handleSubmit = (e:SyntheticEvent<HTMLFormElement>) => {
    setErrorPassword('')
    setErrorEmail('')
    setErrorProgram('')
    e.preventDefault()
    if (password === confirmPassword && program.length > 0) {
      createUserWithEmailAndPassword(email, password).then(userCredential => {
        const user = userCredential?.user
        const uid = user?.uid ?? ''

        const userDocRef = doc(db, 'users', uid)
        const userData: UserCollection = {
          email,
          firstName,
          lastName,
          username,
          avatar: imgUrl,
          program
        }

        setDoc(userDocRef, userData)
      }).catch(e => {
        errorMessage = e
      })
    } else if (password !== confirmPassword) {
      setErrorPassword('Password confirmation does not match')
    } else if (program.length > 0) {
      setErrorProgram('Please select one program')
    }
  }

  if (user?.user) {
    updateProfile(user.user, { displayName: `${firstName} ${lastName}|${username}`, photoURL: imgUrl })
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

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined
    if (file) {
      const task = uploadImage(file, 'profilePic')
      setTask(task)
    }
  }

  useEffect(() => {
    if (task) {
      const onProgress = () => {
        setImgLoading(true)
      }
      const onError = () => {}
      const onComplete = () => {
        setImgLoading(false)
        getDownloadURL(task.snapshot.ref).then(setImgUrl)
      }
      task.on('state_changed',
        onProgress,
        onError,
        onComplete
      )
    }
  }, [task])

  return (
    <>
      <div className='pb-5 flex-col'>
        <h1 className='text-center text-2xl font-concert-one text-text-dark-green pb-5'>Create new account</h1>
      </div>
      <form className='flex flex-col gap-4 items-center font-karla w-96 overflow-y-scroll no-scrollbar' onSubmit={handleSubmit}>
        <div className='w-full grid'>
          {
            imgLoading && <div className='justify-self-center h-20 w-20 bg-light-green animate-pulse rounded-full'></div>
          }
          {
            !imgLoading && <Avatar size={'lg'} rounded={true} className='avatar-img' img={imgUrl}/>
          }
          <div className='mt-2'>
            <label htmlFor='avatar-img' className='text-center text-sm block w-2/5 text-ligth-text-green mx-auto bg-dark-green py-1 font-concert-one rounded-lg'>Select picture</label>
            <input className='hidden' onChange={handleChangeImg} type='file' accept="image/gif, image/jpeg, image/png, image/jpg" id='avatar-img'/>
          </div>
        </div>
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
            <Label className='font-concert-one' htmlFor="program" value="Program"/>
          </div>
          <div className='bg-[#F9fAFB] border border-gray-300 rounded-lg p-3 flex justify-center '>
            <Dropdown label={program} className='max-h-full overflow-y-scroll stroke-white w-full font-karla' color={''}>
              {
                programs.map((pro, i) => <Dropdown.Item id={pro} onClick={() => setProgram(pro)} key={i}>{pro}</Dropdown.Item>)
              }
            </Dropdown>
          </div>
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
          (error && errorPassword.length === 0) && <p id='databaseErrorMessage' className='text-sm text-action-red font-semibold font-karla text-center w-4/5'>{errorMessage}</p>
        }

        {
          errorPassword.length > 0 && <p id='passwordErrorMessage' className='text-sm text-action-red font-semibold font-karla text-center w-4/5'>{errorPassword}</p>
        }

        {
          errorEmail && <p id='emailErrorMessage' className='text-sm text-action-red font-semibold font-karla text-center w-4/5'>{errorEmail}</p>
        }
        {
          erroProgram && <p id='programErrorMessage' className='text-sm text-action-red font-semibold font-karla text-center w-4/5'>{erroProgram}</p>
        }

        <button id='btnRegister' className='text-[#F3F4ED] bg-dark-green border border-transparent hover:bg-dark-green/80 flex items-center justify-center p-2 text-center font-semibold font-karla rounded-lg w-3/5'>
        {
            loading
              ? <Spinner />
              : 'Register'
          }
        </button>

      </form>

    </>

  )
}
