import React, { RefObject, SyntheticEvent } from 'react'

interface PageContenLayoutProps {
  children:React.ReactNode,
  handleScroll?: (e: SyntheticEvent) => void,
  handleRef?:RefObject<HTMLElement>
}

export const PageContenLayout = ({ children, handleScroll, handleRef }: PageContenLayoutProps) => {
  return (
    <section className={'flex flex-col md:col-span-5 gap-4 overflow-scroll no-scrollbar pb-44 h-screen items-center md:mt-16 relative overscroll-x-none'} onScroll={handleScroll} ref={handleRef}>
      {children}
    </section>
  )
}
