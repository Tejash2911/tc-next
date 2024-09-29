'use client'
import { useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { clearError } from '@/redux/slices/errorSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export default function Message() {
  const dispatch = useAppDispatch()
  const id = useAppSelector(state => state.error.id)
  const message = useAppSelector(state => state.error.error)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (message && id) {
      setIsShow(true)

      const timeout = setTimeout(() => {
        dispatch(clearError())
        setIsShow(false)
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [message, id, dispatch])

  return (
    <>
      {isShow && (
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fadeInOut font-Urbanist'>
          <div className='bg-gradient-to-r from-[#001845] via-[#022b3a] to-[#00384a] text-white rounded-2xl shadow-md max-w-sm w-full p-3'>
            <span className='mx-2'>{message}</span>
            <button onClick={() => setIsShow(false)} className='text-white hover:text-red-500 focus:outline-none'>
              <CancelIcon />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
