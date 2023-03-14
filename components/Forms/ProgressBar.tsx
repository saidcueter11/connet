import { usePasswordStrength } from 'hooks/usePasswordStrength'

interface ProgressBarProps {
  password: string
}

export const ProgressBar = ({ password }: ProgressBarProps) => {
  const [strength, isValid] = usePasswordStrength(password)
  const errorMessage = !isValid && 'Password must contain at least 8 characters, one letter, one digit, and one special character.'
  return (
    <>
      <div className="mt-2 relative rounded-md">
        <div className="h-2 bg-gray-300 rounded-md">
          <div
            className={`h-full rounded-md ${
              strength === 'Weak'
                ? 'bg-red-500'
                : strength === 'Medium'
                ? 'bg-orange-500'
                : strength === 'Strong'
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${(['Weak', 'Medium', 'Strong', 'Very strong'].indexOf(strength) + 1) / 4 * 100}%` }}
          ></div>
        </div>
        <p className={`font-karla ${
              strength === 'Weak'
                ? 'text-red-500'
                : strength === 'Medium'
                ? 'text-orange-500'
                : strength === 'Strong'
                ? 'text-yellow-500'
                : 'text-green-500'
            }`}>
          {strength}
        </p>

        {
          (errorMessage && password.length > 0) && <p className='text-sm text-action-red font-semibold font-karla text-center '>{errorMessage}</p>
        }
      </div>
    </>
  )
}
