'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCurrentUser, useLogin } from '@/hooks/useUserQueries'
import { useAppDispatch } from '@/redux/hooks'
import { messageActions } from '@/redux/slices/messageSlice'

const LoginV2 = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const dispatch = useAppDispatch()
  const router = useRouter()
  const loginMutation = useLogin()
  const { data: currentUser } = useCurrentUser()

  useEffect(() => {
    if (!currentUser) return
    router.push('/')
  }, [currentUser])

  const handle = {
    validateForm: () => {
      const newErrors = {}

      if (!email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Please enter a valid email address'
      }

      if (!password.trim()) {
        newErrors.password = 'Password is required'
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long'
      }

      setErrors(newErrors)

      return Object.keys(newErrors).length === 0
    },

    clearError: field => {
      setErrors(prev => ({ ...prev, [field]: '' }))
    },

    onSubmit: async e => {
      e.preventDefault()

      if (!handle.validateForm()) {
        return
      }

      try {
        const res = await loginMutation.mutateAsync({ email, password })

        dispatch(messageActions.setMessage(res?.message))
      } catch (error) {
        dispatch(messageActions.setMessage(error?.data?.message))
      }
    }
  }

  return (
    <div className='bg-[#e0dede]'>
      <div className='container flex min-h-screen items-center justify-center'>
        <div className='w-full max-w-sm rounded-xl bg-white p-8 shadow-md'>
          <h1 className='mb-6 text-xl font-semibold text-gray-800 sm:text-2xl'>Login</h1>
          <form className='space-y-4 text-xs sm:text-sm' autoComplete='on' onSubmit={handle.onSubmit}>
            <div>
              <input
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                name='emailField'
                type='email'
                placeholder='Email'
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  handle.clearError('email')
                }}
              />
              {errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email}</p>}
            </div>
            <div>
              <input
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                name='passwordField'
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  handle.clearError('password')
                }}
                autoComplete='off'
              />
              {errors.password && <p className='mt-1 text-xs text-red-500'>{errors.password}</p>}
            </div>
            <div className='text-primary-600 text-right font-medium hover:underline'>
              <Link href='/forgot-password' className='text-gray-500 hover:underline'>
                Forgot your password?
              </Link>
            </div>
            <button
              type='submit'
              className='focus:shadow-outline rounded-xl bg-black px-4 py-2 text-white focus:outline-none disabled:bg-gray-500'
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className='mt-4 text-center'>
            <p className='text-xs font-medium text-gray-500 sm:text-sm'>
              Don’t have an account yet?
              <Link href='/register' className='text-gray-500 hover:underline'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
