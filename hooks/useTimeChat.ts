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

    const hours = messageDate.getHours() % 12 || 12
    const minutes = messageDate.getMinutes()
    const amPm = messageDate.getHours() < 12 ? 'am' : 'pm'
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`

    const formattedDate = isToday
      ? ''
      : messageDate.getDate() === currentDate.getDate() - 1
        ? 'Yesterday'
        : `${messageDate.getDate()}/${messageDate.getMonth() + 1}/${messageDate.getFullYear()}`

    setTimeString(isToday ? formattedTime : formattedDate)
  }, [timestamp])

  return timeString
}
