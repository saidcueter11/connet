import React from 'react'

interface MessageContainerProps {
  children: React.ReactNode
}

export const MessageContainer = ({ children }: MessageContainerProps) => {
  return (
    <div className='flex w-full bg-light-green relative rounded-xl py-1'>
      {children}
    </div>
  )
}
