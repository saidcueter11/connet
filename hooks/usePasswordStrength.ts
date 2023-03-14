import { useEffect, useState } from 'react'

type PasswordStrength = 'Weak' | 'Medium' | 'Strong' | 'Very strong';

export function usePasswordStrength (password: string): [PasswordStrength, boolean] {
  const [strength, setStrength] = useState<PasswordStrength>('Weak')
  const [isValid, setIsValid] = useState<boolean>(false)

  useEffect(() => {
    if (password.length === 0) {
      setStrength('Weak')
      setIsValid(false)
    } else if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setStrength('Weak')
      setIsValid(false)
    } else if (password.length < 12 || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      setStrength('Medium')
      setIsValid(true)
    } else if (password.length < 16) {
      setStrength('Strong')
      setIsValid(true)
    } else {
      setStrength('Very strong')
      setIsValid(true)
    }
  }, [password])

  return [strength, isValid]
}
