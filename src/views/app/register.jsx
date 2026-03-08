'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { messageActions } from '@/redux/slices/messageSlice'
import { useAppDispatch } from '@/redux/hooks'
import { useRegister, useCurrentUser } from '@/hooks/useUserQueries'

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
  const { data: currentUser } = useCurrentUser()
  const registerMutation = useRegister()
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (currentUser) router.push('/')
  }, [currentUser, router])

  const handle = {
    onSubmit: async e => {
      e.preventDefault()
      const errors = handle.handleValidate(formValues)

      setFormErrors(errors)

      if (Object.keys(errors).length === 0) {
        try {
          await registerMutation.mutateAsync(formValues)
          // Navigation will happen automatically via useEffect when currentUser updates
        } catch (error) {
          dispatch(messageActions.setMessage(error?.message))
        }
      }
    },
    handleOnChange: e => {
      const { name, value } = e.target

      setFormValues({ ...formValues, [name]: value })
    },
    handleValidate: values => {
      const error = {}

      if (!values.firstName) error.firstName = 'first name is required'
      if (!values.lastName) error.lastName = 'last name is required'
      if (!values.number) error.number = 'phone number is required'
      if (!values.email) error.email = 'email is required'
      if (!values.password) error.password = 'password is required'
      if (!values.confirmPassword) error.confirmPassword = 'confirm password is required'

      return error
    }
  }

  return (
    <div className='bg-[#e0dede]'>
      <div className='container flex min-h-screen items-center justify-center'>
        <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-md'>
          <h1 className='mb-6 text-xl font-semibold text-gray-800 sm:text-2xl'>Sign Up</h1>
          <form className='space-y-4 text-xs sm:text-sm' onSubmit={handle.onSubmit} autoComplete='on'>
            <div>
              <input
                type='text'
                name='firstName'
                placeholder='first name'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <p className='mt-1 text-xs text-red-500'>{formErrors.firstName}</p>
            </div>
            <div>
              <input
                type='text'
                name='lastName'
                placeholder='last name'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <p className='mt-1 text-xs text-red-500'>{formErrors.lastName}</p>
            </div>
            <div>
              <input
                type='number'
                name='number'
                placeholder='phone number'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <p className='mt-1 text-xs text-red-500'>{formErrors.number}</p>
            </div>
            <div>
              <input
                type='email'
                name='email'
                placeholder='email'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <p className='mt-1 text-xs text-red-500'>{formErrors.email}</p>
            </div>
            <div>
              <input
                type='password'
                name='password'
                placeholder='password'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <p className='mt-1 text-xs text-red-500'>{formErrors.password}</p>
            </div>
            <div>
              <input
                type='password'
                name='confirmPassword'
                placeholder='confirm password'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <p className='mt-1 text-xs text-red-500'>{formErrors.confirmPassword}</p>
            </div>
            <button
              className='focus:shadow-outline rounded-xl bg-black px-4 py-2 text-white focus:outline-none disabled:bg-gray-500'
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'signing up...' : 'Sign Up'}
            </button>
            <div className='text-primary-600 font-medium hover:underline'>
              <Link href='/login' className='text-gray-500 hover:underline'>
                Already Have Account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterV2
