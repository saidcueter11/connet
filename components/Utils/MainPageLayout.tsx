import { SideMenuDesktop } from 'components/SideBars/SideMenuDesktop'
import { NavBarDesktop } from './NavBarDesktop'
import { SideBarContainer } from 'components/SideBars/SideBarContainer'
import React from 'react'
import { NavBarMobile } from './NavBarMobile'
import { useRouter } from 'next/router'

export const MainPageLayout = ({ children }: {children?: React.ReactNode}) => {
  const router = useRouter()
  const path = router.route.split('/')[3]
  const atMessages = path === 'chat'
  return (
    <>
      <NavBarDesktop/>
      <SideBarContainer/>
      <main className="relative w-full h-screen md:grid grid-cols-8 gap-4 justify-center max-w-5xl mx-auto">
        <SideMenuDesktop/>
        {children}
      </main>
      {
        !atMessages && <NavBarMobile/>
      }
    </>
  )
}
