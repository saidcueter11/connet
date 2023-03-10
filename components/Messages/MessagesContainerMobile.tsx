
import React from 'react'

interface MessagesContainerMobileProps {
  children: React.ReactNode
}
export const MessagesContainerMobile = ({ children }: MessagesContainerMobileProps) => {
  return (
    <>
      <section className='flex flex-col gap-3 h-5/6 overflow-y-scroll no-scrollbar px-1 relative max-h-screen'>
        {children}
      </section>
    </>
  )
}
