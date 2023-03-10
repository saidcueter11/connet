import React from 'react'

interface ListCardsContainerProps {
  children: React.ReactNode
}

export const ListCardsContainer = ({ children }: ListCardsContainerProps) => {
  return (
    <>
      <div className='h-[26rem] overflow-y-scroll w-80 rounded flex flex-col gap-2 no-scrollbar'>
        {children}
      </div>
    </>
  )
}
