'use client'
import { createContext, useContext, useState, useCallback } from 'react'

const MessageContext = createContext()

export function useMessage() {
  const context = useContext(MessageContext)

  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider')
  }

  return context
}

export function MessageProvider({ children }) {
  const [message, setMessage] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const showMessage = useCallback(text => {
    setMessage(text)
    setIsVisible(true)

    const timeout = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => setMessage(null), 300) // Clear message after fade out
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  const clearMessage = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => setMessage(null), 300)
  }, [])

  const value = {
    message,
    isVisible,
    showMessage,
    clearMessage
  }

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}
