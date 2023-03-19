import { db, updateUser } from '@firebase/client'
import ArrowLeft from 'components/Icons/ArrowLeft'
import { EditIcon } from 'components/Icons/EditIcon'
import { ChangeProfileImgModal } from 'components/Modal/ChangeProfileImgModal'
import { ProfileCard } from 'components/Settings/ProfileCard'
import { useAuth } from 'context/authUserContext'
import { getAuth } from 'firebase/auth'
import { doc } from 'firebase/firestore'
import { Avatar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useUpdateProfile } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import { UserCollection } from 'types/databaseTypes'

export default function SettingsPage () {
  const { authUser } = useAuth()
  console.log({ authUser })
  const auth = getAuth()
  const docRef = doc(db, 'users', authUser?.uid as string)
  const [value, loading] = useDocument(docRef)
  const [updateProfile, updating, error] = useUpdateProfile(auth)
  const [user, setUser] = useState<UserCollection>()
  const [imgUrl, setImgUrl] = useState(user?.avatar)
  const [prevImg, setPrevImg] = useState(imgUrl)
  const [showModal, setShowModal] = useState(false)
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (!loading) {
      const data: UserCollection = value?.data() as UserCollection
      setUser(data)
      setFullname(`${data?.firstName} ${data?.lastName}`)
      setUsername(data?.username as string)
    }
  }, [loading, value])

  const handleOpenModal = () => setShowModal(true)

  const handleUpdateProfile = () => {
    updateProfile({ photoURL: imgUrl, displayName: `${fullname}|${username}` })
    updateUser({
      userId: authUser?.uid as string,
      avatar: imgUrl,
      firstName: fullname.split(' ')[0],
      lastName: fullname.split(' ')[1],
      username
    })
  }

  return (
    <>
      <ArrowLeft/>

      <main>
        <h1 className='text-3xl font-concert-one text-center text-text-dark-green'>Settings</h1>

        <section className='h-full pt-10 flex flex-col gap-4 items-center'>
          <div className='relative'>
            <Avatar size={'lg'} rounded={true} img={imgUrl} className='avatar-img border border-dark-green rounded-full bg-white' />
            <div onClick={handleOpenModal} className='absolute flex justify-center items-center -top-1 -right-4 transform -translate-x-1/2 bg-dark-green rounded-full h-7 w-7'>
              <EditIcon width={18} height={18} stroke='#FD8C77' fill='none'/>
            </div>
          </div>

          <ProfileCard text={'Name'} info={fullname} setInfo={setFullname}/>

          <ProfileCard text={'Username'} info={username as string} setInfo={setUsername}/>

          <ProfileCard text={'Email'} info={user?.email as string}/>

          <ProfileCard text='Password' info='sa'/>

          <ProfileCard text='Program' info='Computer Programming'/>

          <button className='w-2/4 bg-dark-green text-ligth-text-green font-concert-one rounded-lg py-1' onClick={handleUpdateProfile}>Update profile</button>

        </section>

      </main>

      <ChangeProfileImgModal prevImg={prevImg as string} setShowModal={setShowModal} showModal={showModal} setImgUrl={setImgUrl} setPrevImg={setPrevImg}/>
    </>

  )
}
