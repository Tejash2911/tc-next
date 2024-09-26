'use client'
import { setError } from '@/redux/slices/errorSlice'
import { signUpSuccess, signUpFailed } from '@/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { axiosInstance } from '@/lib/axios'

const RegisterV2 = () => {
  const initialValue = {
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: '',
    userIP: ''
  }
  const [formValues, setFormValues] = useState(initialValue)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const { currentUser, isFetching, error } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (currentUser) router.push('/')
  }, [currentUser, router])

  const handleOnChange = e => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setFormErrors(handleValidate(formValues))
    setIsSubmit(true)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const res = await axiosInstance.post('/auth/register', formValues)
        dispatch(signUpSuccess(res.data))
        router.push('/')
      } catch (error) {
        dispatch(signUpFailed(error.response.data.message))
        dispatch(setError(error.response.data.message))
      }
    }
  }

  const handleValidate = values => {
    const error = {}
    if (!values.firstName) error.firstName = 'firstName is requires'
    if (!values.lastName) error.lastName = 'lastName is requires'
    if (!values.number) error.number = 'number is requires'
    if (!values.email) error.email = 'email is requires'
    if (!values.password) error.password = 'password is requires'
    if (!values.confirmPassword) error.confirmPassword = 'confirm password is requires'
    return error
  }
  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-100 to-white bg-cover'>
      <div className='max-w-lg w-full p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Sign Up</h1>
        <form className='space-y-4' onSubmit={handleSubmit} autoComplete='on'>
          <div>
            <input
              type='text'
              name='firstName'
              placeholder='first name'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              onChange={handleOnChange}
            />
            <span className='w-100 text-sm text-red-600 mb-[1px]'>{formErrors.firstName}</span>
          </div>
          <div>
            <input
              type='text'
              name='lastName'
              placeholder='last name'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              onChange={handleOnChange}
            />
            <span className='w-100 text-sm text-red-600 mb-[1px]'>{formErrors.lastName}</span>
          </div>
          <div>
            <input
              type='number'
              name='number'
              placeholder='phone number'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              onChange={handleOnChange}
            />
            <span className='w-100 text-sm text-red-600 mb-[1px]'>{formErrors.number}</span>
          </div>
          <div>
            <input
              type='email'
              name='email'
              placeholder='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              onChange={handleOnChange}
            />
            <span className='w-100 text-sm text-red-600 mb-[1px]'>{formErrors.email}</span>
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='password'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              onChange={handleOnChange}
            />
            <span className='w-100 text-sm text-red-600 mb-[1px]'>{formErrors.password}</span>
          </div>
          <div>
            <input
              type='password'
              name='confirmPassword'
              placeholder='confirm password'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              onChange={handleOnChange}
            />
            <span className='w-100 text-sm text-red-600 mb-[1px]'>{formErrors.confirmPassword}</span>
          </div>
          <button
            className='bg-black text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            disabled={isFetching}
          >
            {isFetching ? 'signing up...' : 'Sign Up'}
          </button>
          <div className='text-sm font-medium text-primary-600 hover:underline'>
            <Link href='/login' className='text-gray-500 hover:underline'>
              Already Have Account?
            </Link>
          </div>
        </form>
        {error && <span className='w-100 text-sm text-red-600 mb-[1px]'>{error.error}</span>}
      </div>
    </div>
  )
}

export default RegisterV2
