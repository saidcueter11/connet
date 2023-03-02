import { Carousel } from 'flowbite-react'
import React from 'react'

interface CarosuelContainerProps {
  children: React.ReactNode
}

export const CarosuelContainer = ({ children }: CarosuelContainerProps) => {
  return (
    <>
      <div className='h-72 w-80 bg-dark-green rounded-lg'>
        <Carousel slide={false} indicators={false}>
          {children}
        </Carousel>
      </div>
    </>
  )
}
