import { auth } from '@firebase/client'
import { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export interface ContextType {
  authUser: User | undefined| null
  loading: boolean
  error: Error | undefined
  isAuthenticated: boolean
  logout: () => void
}

interface AuthUserProviderProps {
  children: React.ReactNode
}

const AuthUserContext = createContext<ContextType>({ authUser: null, loading: true, error: undefined, isAuthenticated: false, logout: () => {} })

export function useAuth () {
  return useContext(AuthUserContext)
}

export const AuthUserProvider = ({ children }: AuthUserProviderProps) => {
  const [user, loading, error] = useAuthState(auth)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()

  const logout = () => {
    auth.signOut().then(() => {
      setIsAuthenticated(false)
      router.push('/login')
    })
  }

  useEffect(() => {
    if (!loading && !user) {
      localStorage.setItem('redirectUrl', router.asPath)
      router.push('/login')
    }
    if (user) {
      setIsAuthenticated(true)
    }
  }, [user, loading])

  useEffect(() => {
    const redirectUrl = localStorage.getItem('redirectUrl')
    if (isAuthenticated && redirectUrl) {
      localStorage.removeItem('redirectUrl')
      router.push(redirectUrl)
    }
  }, [isAuthenticated])

  const value: ContextType = {
    authUser: user,
    loading,
    error,
    isAuthenticated,
    logout
  }

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  )
}
