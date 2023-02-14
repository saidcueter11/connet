import React from 'react'

interface AppLayoutProps {
  children: React.ReactNode
}
export const AppLayout = ({ children }:AppLayoutProps) => {
  return (
    <main className="w-full h-screen p-4">
      {children}
    </main>
  )
}
