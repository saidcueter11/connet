import { ProgressBar } from 'components/Forms/ProgressBar'
import { CloseIcon } from 'components/Icons/CloseIcon'
import { EventFeedback } from 'components/Utils/EventFeedback'
import { getAuth } from 'firebase/auth'
import { Modal } from 'flowbite-react'
import { usePasswordStrength } from 'hooks/usePasswordStrength'
import React, { useState, useEffect } from 'react'
import { useUpdatePassword } from 'react-firebase-hooks/auth'

interface ChangePasswordProfileProps {
  showModal: boolean
  password: string
  setShowModal: (isOpen: boolean) => void
  setPassword: (pass: string) => void
}

export const ChangePasswordProfile = ({ showModal, setShowModal, password, setPassword }:ChangePasswordProfileProps) => {
  const auth = getAuth()
  const [isHydratated, setIsHydratated] = useState(false)
  const [confirmPassword, setconfirmPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [updatePassword] = useUpdatePassword(auth)
  const [, isValid] = usePasswordStrength(password)
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => setIsHydratated(true), [])

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      if (password === confirmPassword) {
        updatePassword(password)
        setErrorPassword('')
        setIsUpdated(true)
        setTimeout(() => {
          setIsUpdated(false)
          setShowModal(false)
        }, (1500))
      } else {
        setErrorPassword('Password confirmation does not match')
      }
    } else {
      setErrorPassword('Password is not valid')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setPassword('')
    setconfirmPassword('')
    setErrorPassword('')
  }

  if (isHydratated) {
    return (
      <>
        <Modal show={showModal} size={'sm'}>
          <Modal.Body className='rounded-lg bg-dark-green'>
            <div onClick={handleCloseModal}>
              <CloseIcon width={24} height={24} stroke='#FD8C77' fill='none'/>
            </div>
            <form className='w-full flex flex-col gap-4' onSubmit={handleSaveChanges}>
              <label htmlFor="password" className='text-ligth-text-green font-concert-one text-lg'>New password</label>
              <input id='password' required={true} type='password' value={password} onChange={e => setPassword(e.target.value)} className='bg-light-green rounded p-1 font-karla'/>
              <ProgressBar password={password} mode='dark'/>

              <label htmlFor="confirmedPassword" className='text-ligth-text-green font-concert-one text-lg'>Confirm new password</label>
              <input id='confirmedPassword' type='password' value={confirmPassword} required={true} onChange={e => setconfirmPassword(e.target.value)} className='bg-light-green rounded p-1 font-karla'/>

              {
                errorPassword.length > 0 && <p className='text-sm text-ligth-text-green font-semibold font-karla text-center w-full'>{errorPassword}</p>
              }
              <button className='bg-light-green w-2/5 self-center rounded-lg pb-2 font-concert-one text-dark-green'>Save changes</button>

            </form>

            <EventFeedback event={isUpdated} eventDescription='Your password has been changed'/>

          </Modal.Body>
        </Modal>
      </>
    )
  }

  return <></>
}
