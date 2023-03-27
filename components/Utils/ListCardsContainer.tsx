import React from 'react'

interface ListCardsContainerProps {
  children: React.ReactNode
}

export const ListCardsContainer = ({ children }: ListCardsContainerProps) => {
  return (
    <>
      <div className='h-[90vh] overflow-y-scroll w-fit flex flex-col items-center gap-2 no-scrollbar pb-44 md:grid-cols-2 md:grid md:items-start'>
        {children}
      </div>
    </>
  )
}
