import React from 'react'

interface ListCardsContainerProps {
  children: React.ReactNode
}

export const ListCardsContainer = ({ children }: ListCardsContainerProps) => {
  return (
    <>
      <div className='h-[65vh] overflow-y-scroll w-fit flex flex-col items-center gap-2 no-scrollbar'>
        {children}
      </div>
    </>
  )
}
