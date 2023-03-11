import { Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export function useChatTime (timestamp: Timestamp): string {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const messageDate = timestamp.toDate()
    const currentDate = new Date()

    const isToday =
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear()

    const isYesterday =
      messageDate.getDate() === currentDate.getDate() - 1 &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear()

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const messageDayOfWeek = messageDate.getDay()
    const messageDayOfWeekString = weekDays[messageDayOfWeek]

    const hours = messageDate.getHours() % 12 || 12
    const minutes = messageDate.getMinutes()
    const amPm = messageDate.getHours() < 12 ? 'am' : 'pm'
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`

    const formattedDate = isToday
      ? formattedTime
      : isYesterday
        ? `Yesterday ${formattedTime}`
        : messageDate > new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) // Check if message is within the past week
          ? `${messageDayOfWeekString} ${formattedTime}` // Display the day of the week and time
          : `${messageDate.getDate()}/${messageDate.getMonth() + 1}/${messageDate.getFullYear()}` // Display the full date

    setTimeString(formattedDate)
  }, [timestamp])

  return timeString
}
