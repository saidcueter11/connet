
import React, { useEffect, useRef } from 'react'

interface MessagesContainerMobileProps {
  children: React.ReactNode
}
export const MessagesContainerMobile = ({ children }: MessagesContainerMobileProps) => {
  const chatContainerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (chatContainerRef.current !== null) { chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight + 80 }
  }, [children])

  return (
    <>
      <section className='flex flex-col gap-3 h-4/5 overflow-y-scroll no-scrollbar px-1 relative pb-5' ref={chatContainerRef}>
        {children}
      </section>
    </>
  )
}
