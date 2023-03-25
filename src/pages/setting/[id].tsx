import { db, updateUser } from '@firebase/client'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { EditIcon } from 'components/Icons/EditIcon'
import { ChangeNameProfileModal } from 'components/Modal/ChangeNameProfile'
import { ChangePasswordProfile } from 'components/Modal/ChangePasswordProfile'
import { ChangeProfileImgModal } from 'components/Modal/ChangeProfileImgModal'
import { ChangeProgramProfile } from 'components/Modal/ChangeProgramProfile'
import { ChangeUsernameProfile } from 'components/Modal/ChangeUsernameProfile'
import { ProfileCard } from 'components/Settings/ProfileCard'
import { EventFeedback } from 'components/Utils/EventFeedback'
import { useAuth } from 'context/authUserContext'
import { getAuth } from 'firebase/auth'
import { doc } from 'firebase/firestore'
import { Avatar } from 'flowbite-react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useUpdateProfile } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import { UserCollection } from 'types/databaseTypes'

interface SettingsPageProps {
  id: string
}

export default function SettingsPage ({ id }: SettingsPageProps) {
  const { authUser } = useAuth()
  const userId = authUser?.uid ?? id
  const router = useRouter()
  const auth = getAuth()
  const docRef = doc(db, 'users', userId)
  const [value, loading] = useDocument(docRef)
  const [updateProfile] = useUpdateProfile(auth)

  const [user, setUser] = useState<UserCollection>()
  const [imgUrl, setImgUrl] = useState(user?.avatar)
  const [prevImg, setPrevImg] = useState(imgUrl)
  const [showModalImg, setShowModalImg] = useState(false)
  const [showModalName, setShowModalName] = useState(false)
  const [showModalUsername, setShowModalUsername] = useState(false)
  const [showModalPassword, setShowModalPassword] = useState(false)
  const [showModalProgram, setShowModalProgram] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [program, setProgram] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    if (!loading) {
      const data: UserCollection = value?.data() as UserCollection
      setUser(data)
      setFirstName(data.firstName as string)
      setLastName(data.lastName as string)
      setUsername(data?.username as string)
      setImgUrl(data.avatar)
      setPrevImg(data.avatar)
    }

    if (!authUser) router.push('/login')
  }, [loading, value, authUser])

  const handleOpenModalImg = () => setShowModalImg(true)
  const handleOpenModalName = () => setShowModalName(true)
  const handleOpenModalUsername = () => setShowModalUsername(true)
  const handleOpenModalPassword = () => setShowModalPassword(true)
  const handleOpenModalProgram = () => setShowModalProgram(true)

  const handleUpdateProfile = () => {
    updateProfile({ photoURL: imgUrl, displayName: `${firstName} ${lastName}|${username}` })
    updateUser({
      userId: authUser?.uid as string,
      avatar: imgUrl,
      firstName,
      lastName,
      username,
      program
    })
    setIsUpdated(true)
    setTimeout(() => {
      setIsUpdated(false)
    }, 1500)
  }

  return (
    <>
      <ArrowLeft/>
      <EventFeedback event={isUpdated} eventDescription='Your profile has been updated'/>
      <main>
        <h1 className='text-3xl font-concert-one text-center text-text-dark-green backdrop-blur-[2px]'>Settings</h1>

        <section className='h-screen pt-10 pb-20 flex flex-col gap-4 items-center overflow-y-scroll no-scrollbar'>
          <div className='relative'>
            <Avatar size={'xl'} rounded={true} img={imgUrl} className='avatar-img' />
            <div onClick={handleOpenModalImg} className='absolute flex justify-center items-center -top-2 -right-1 transform -translate-x-1/2 bg-dark-green rounded-full h-7 w-7'>
              <EditIcon width={18} height={18} stroke='#FD8C77' fill='none'/>
            </div>
          </div>

          <ProfileCard text={'Name'} info={`${firstName} ${lastName}`}>
            <div onClick={handleOpenModalName} className='absolute flex justify-center items-center -top-2 right-1 bg-dark-green rounded-full h-7 w-7'>
              <EditIcon width={18} height={18} stroke='#FD8C77' fill='none'/>
            </div>
          </ProfileCard>

          <ProfileCard text={'Username'} info={username as string}>
            <div onClick={handleOpenModalUsername} className='absolute flex justify-center items-center -top-2 right-1 bg-dark-green rounded-full h-7 w-7'>
              <EditIcon width={18} height={18} stroke='#FD8C77' fill='none'/>
            </div>
          </ProfileCard>

          <ProfileCard text={'Email'} info={user?.email as string}></ProfileCard>

          <ProfileCard text='Password' info='●●●●●●●●'>
            <div onClick={handleOpenModalPassword} className='absolute flex justify-center items-center -top-2 right-1 bg-dark-green rounded-full h-7 w-7'>
              <EditIcon width={18} height={18} stroke='#FD8C77' fill='none'/>
            </div>
          </ProfileCard>

          <ProfileCard text='Program' info={program}>
            <div onClick={handleOpenModalProgram} className='absolute flex justify-center items-center -top-2 right-1 bg-dark-green rounded-full h-7 w-7'>
              <EditIcon width={18} height={18} stroke='#FD8C77' fill='none'/>
            </div>
          </ProfileCard>

          <button className='w-2/4 bg-dark-green text-ligth-text-green font-concert-one rounded-lg py-1' onClick={handleUpdateProfile}>Update profile</button>

        </section>

      </main>

      <ChangeNameProfileModal
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setShowModal={setShowModalName}
        showModal={showModalName}/>

      <ChangeProfileImgModal
        prevImg={prevImg as string}
        setShowModal={setShowModalImg}
        showModal={showModalImg}
        setImgUrl={setImgUrl}
        setPrevImg={setPrevImg}/>

      <ChangeUsernameProfile
        setShowModal={setShowModalUsername}
        setUsername={setUsername}
        showModal={showModalUsername}
        username={username}
        />

      <ChangePasswordProfile
        password={password}
        setPassword={setPassword}
        setShowModal={setShowModalPassword}
        showModal={showModalPassword}
        />

      <ChangeProgramProfile
        program={program}
        setProgram={setProgram}
        setShowModal={setShowModalProgram}
        showModal={showModalProgram}
        />

    </>

  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const { id } = context.query
  return { props: { id } }
}
