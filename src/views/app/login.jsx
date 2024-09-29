'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setError } from '@/redux/slices/errorSlice'
import { loginSuccess } from '@/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { axiosInstance } from '@/lib/axios'

const LoginV2 = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { currentUser, isFetching, isError } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (currentUser) router.push('/')
  }, [currentUser, router])

  async function submit(e) {
    e.preventDefault()

    try {
      const res = await axiosInstance.post('/auth/login', { email, password })

      dispatch(loginSuccess(res.data))
    } catch (error) {
      dispatch(setError(error.response.data.message))
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-100 to-white bg-cover'>
      <div className='max-w-sm w-full p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Login</h1>
        <form className='space-y-4' autoComplete='on'>
          <div>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              name='emailField'
              type='email'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              name='passwordField'
              type='password'
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className='text-sm font-medium text-primary-600 hover:underline text-right'>
            <Link href='/forgot-password' className='text-gray-500 hover:underline'>
              Forgot your password?
            </Link>
          </div>
          <button
            className='bg-black text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={submit}
            disabled={isFetching}
          >
            {isFetching ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {isError && <span className='text-red-600'>{isError.error}</span>}
        <div className='text-center mt-4'>
          <p className='text-sm font-medium text-gray-500'>
            Don’t have an account yet?
            <Link href='/register' className='text-gray-500 hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
