import { useRouter } from 'next/router'
import React from 'react'
interface AppLayoutProps {
  children: React.ReactNode
}
export const AppLayout = ({ children }:AppLayoutProps) => {
  const router = useRouter()
  const isChat = router.asPath.includes('/chat/')

  // if (isChat) {
  //   return (
  //   <main className='w-full h-screen overflow-hidden bg-gradient-to-b from-light-green/70 via-light-green/50 to-light-green/30 relative'>
  //     {children}
  //   </main>
  //   )
  // }
  return (
    <main className={`w-full h-screen ${isChat ? 'p-0 md:py-4' : 'py-4 px-6'} overflow-hidden bg-gradient-to-b from-light-green/70 via-light-green/50 to-light-green/30 relative`}>
      {children}
    </main>
  )
}
