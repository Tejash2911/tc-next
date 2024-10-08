'use client'
import { useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { errorActions } from '@/redux/slices/errorSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export default function Message() {
  const dispatch = useAppDispatch()
  const { id, message } = useAppSelector(({ error }) => error)
  const [isShow, setIsShow] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('black')

  useEffect(() => {
    if (message && id) {
      setIsShow(true)
      setBackgroundColor(getRandomColor())

      const timeout = setTimeout(() => {
        dispatch(errorActions.clearError())
        setIsShow(false)
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [message, id])

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  const handleClose = () => {
    dispatch(errorActions.clearError())
    setIsShow(false)
  }

  return (
    <>
      {isShow && (
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fadeInOut font-Urbanist'>
          <div style={{ backgroundColor }} className='rounded-2xl shadow-md max-w-sm w-full p-3'>
            <span className='mx-2 capitalize'>{message}</span>
            <button onClick={handleClose} className='text-white hover:text-red-500 focus:outline-none'>
              <CancelIcon />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
