
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
      <section className='flex flex-col gap-3 h-full overflow-y-hidden relative px-3 w-full md:border md:border-gray-300 ' ref={chatContainerRef}>
        <div className='overflow-y-scroll no-scrollbar h-full flex flex-col gap-3 py-2'>
          {children}
        </div>
      </section>
    </>
  )
}
