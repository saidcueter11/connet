
import React, { useEffect, useRef } from 'react'

interface MessagesContainerMobileProps {
  children: React.ReactNode
}
export const MessagesContainerMobile = ({ children }: MessagesContainerMobileProps) => {
  const chatContainerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    chatContainerRef.current?.focus()
    if (chatContainerRef.current !== null) {
      chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight + 80)
    }
  }, [children])

  return (
    <>
      <section className='flex flex-col gap-3 h-screen overflow-y-scroll no-scrollbar pb-10 relative px-1' ref={chatContainerRef}>
        {children}
      </section>
    </>
  )
}
