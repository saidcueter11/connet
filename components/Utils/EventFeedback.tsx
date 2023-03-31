interface EventFeedbackProps {
  event: boolean
  eventDescription: string
}

export const EventFeedback = ({ event, eventDescription }: EventFeedbackProps) => {
  return (
    <>
      <div className={`absolute translate-y-3 rounded-lg p-4 bg-dark-green w-4/5 text-center font-karla text-ligth-text-green left-1/2 transform -translate-x-1/2 ${event ? 'opacity-100 z-20' : 'opacity-0 -z-10'} transition-opacity duration-300 shadow-xl`}>
        <p id={eventDescription.split(' ').join('-')}>{eventDescription}</p>
      </div>
    </>
  )
}
