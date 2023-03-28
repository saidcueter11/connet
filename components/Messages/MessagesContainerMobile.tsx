
import React, { useEffect, useRef } from 'react'

interface MessagesContainerMobileProps {
  children: React.ReactNode
}
export const MessagesContainerMobile = ({ children }: MessagesContainerMobileProps) => {
  const chatContainerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    chatContainerRef.current?.focus()
    if (chatContainerRef.current !== null) {
      chatContainerRef.current.scrollTo(0, chatContainerRef.current.scrollHeight)
    }
  }, [children])

  return (
    <>
      <section className='flex flex-col gap-3 h-[83vh] md:h-full overflow-y-scroll no-scrollbar pt-2 relative px-3 w-full md:border md:border-gray-300 md:py-2 md:pb-20' ref={chatContainerRef}>
        {children}
      </section>
    </>
  )
}
