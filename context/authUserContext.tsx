import { auth } from '@firebase/client'
import { User } from 'firebase/auth'
import React, { createContext, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export interface ContextType {
  authUser: User | undefined| null
  loading: boolean
  error: Error | undefined
}

interface AuthUserProviderProps {
  children: React.ReactNode
}

const AuthUserContext = createContext<ContextType>({ authUser: null, loading: true, error: undefined })

export function useAuth () {
  return useContext(AuthUserContext)
}

export const AuthUserProvider = ({ children }: AuthUserProviderProps) => {
  const [user, loading, error] = useAuthState(auth)

  const value: ContextType = {
    authUser: user,
    loading,
    error
  }

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  )
}
