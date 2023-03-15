
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
      <section className='flex flex-col gap-3 h-[89%] overflow-y-scroll no-scrollbar relative pt-14 pb-2 px-1' ref={chatContainerRef}>
        {children}
      </section>
    </>
  )
}
