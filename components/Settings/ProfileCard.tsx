import React from 'react'

interface ProfileCardProps {
  text: 'Name' | 'Username' | 'Email' | 'Password' | 'Program'
  info: string
  children?: React.ReactNode
}

export const ProfileCard = ({ text, info, children }: ProfileCardProps) => {
  return (
    <>
      <div className='w-full relative gap-2 flex-col flex p-3 items-baseline bg-light-green rounded-lg shadow-black/25 shadow'>
        <p className='font-concert-one text-xl text-text-dark-green'>{text}</p>
        <p className='font-karla text-lg text-text-dark-green'>{info}</p>
        {children}
      </div>
    </>
  )
}
