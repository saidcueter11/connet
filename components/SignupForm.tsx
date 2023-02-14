import { Label, TextInput, Button } from 'flowbite-react'

interface SignupFormProps {
  email: string,
  password: string,
  handleSignup: (email: string, password: string) => void
  handleEmail: (email: string) => void
  handlePassword: (password: string) => void
}

export const SignupForm = ({ email, password, handleSignup, handleEmail, handlePassword }: SignupFormProps) => {
  return (
    <form className='flex flex-col gap-4 items-center'>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="First Name"/>
        </div>
        <TextInput id='firstName' type='text' placeholder='Jon' required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastName" value="Last Name"/>
        </div>
        <TextInput id='lastName' type='text' placeholder='Jon' required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username"/>
        </div>
        <TextInput id='username' type='text' placeholder='Jon' required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email"/>
        </div>
        <TextInput id='email' type='email' value={email} placeholder='example@email.com' onChange={e => handleEmail(e.target.value)} required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password"/>
        </div>
        <TextInput id='password' type='password' value={password} onChange={e => handlePassword(e.target.value)} required={true}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirmedPassword" value="Confirm Password"/>
        </div>
        <TextInput id='confirmedPassword' type='password' required={true}/>
      </div>

      <Button onClick={() => handleSignup(email, password)} className='bg-[#09f] w-full'>Register</Button>
    </form>
  )
}
