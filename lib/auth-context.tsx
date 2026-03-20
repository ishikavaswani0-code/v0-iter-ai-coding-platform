'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface UserProfile {
  id: string
  username: string
  email: string
  totalPoints: number
  problemsSolved: number
  mistakesTracked: number
  weakTopics: string[]
  createdAt: Date
}

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  login: (username: string, email: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (username: string, email: string) => {
    setIsLoading(true)
    // Mock login - in production, this would call an API
    const newUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      totalPoints: 0,
      problemsSolved: 0,
      mistakesTracked: 0,
      weakTopics: [],
      createdAt: new Date(),
    }
    setUser(newUser)
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
