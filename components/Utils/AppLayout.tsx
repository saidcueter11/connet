import React from 'react'
interface AppLayoutProps {
  children: React.ReactNode
}
export const AppLayout = ({ children }:AppLayoutProps) => {
  return (
    <main className="w-full h-screen py-4 px-6 overflow-hidden bg-gradient-to-b from-light-green/90 via-light-green/60 to-light-green/30 relative">
      {children}
    </main>
  )
}
