'use client'
import { useEffect, useState } from 'react'
import { errorActions } from '@/redux/slices/errorSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export default function Message() {
  const dispatch = useAppDispatch()
  const { id, message } = useAppSelector(({ error }) => error)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (message && id) {
      setIsShow(true)

      const timeout = setTimeout(() => {
        dispatch(errorActions.clearError())
        setIsShow(false)
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [message, id, dispatch])

  return (
    <>
      {isShow && (
        <div className='animate-fadeInOut fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform font-Urbanist'>
          <div className='flex w-full max-w-sm items-center justify-between rounded-xl bg-teal-700 p-3 text-white shadow-md'>
            <span className='mx-2 capitalize'>{message}</span>
          </div>
        </div>
      )}
    </>
  )
}
