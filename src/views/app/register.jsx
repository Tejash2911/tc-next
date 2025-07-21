'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { errorActions } from '@/redux/slices/errorSlice'
import { register } from '@/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

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
  const { currentUser, loading } = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (currentUser) router.push('/')
  }, [currentUser, router])

  const handle = {
    onSubmit: async e => {
      e.preventDefault()
      setFormErrors(handle.handleValidate(formValues))

      if (Object.keys(formErrors).length === 0) {
        dispatch(register(formValues))
          .unwrap()
          .then()
          .catch(error => dispatch(errorActions.setErrorMessage(error?.message)))
      }
    },
    handleOnChange: e => {
      const { name, value } = e.target

      setFormValues({ ...formValues, [name]: value })
    },
    handleValidate: values => {
      const error = {}

      if (!values.firstName) error.firstName = 'firstName is requires'
      if (!values.lastName) error.lastName = 'lastName is requires'
      if (!values.number) error.number = 'number is requires'
      if (!values.email) error.email = 'email is requires'
      if (!values.password) error.password = 'password is requires'
      if (!values.confirmPassword) error.confirmPassword = 'confirm password is requires'

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
              <span className='w-100 mb-[1px] text-sm text-red-600'>{formErrors.firstName}</span>
            </div>
            <div>
              <input
                type='text'
                name='lastName'
                placeholder='last name'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <span className='w-100 mb-[1px] text-sm text-red-600'>{formErrors.lastName}</span>
            </div>
            <div>
              <input
                type='number'
                name='number'
                placeholder='phone number'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <span className='w-100 mb-[1px] text-sm text-red-600'>{formErrors.number}</span>
            </div>
            <div>
              <input
                type='email'
                name='email'
                placeholder='email'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <span className='w-100 mb-[1px] text-sm text-red-600'>{formErrors.email}</span>
            </div>
            <div>
              <input
                type='password'
                name='password'
                placeholder='password'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <span className='w-100 mb-[1px] text-sm text-red-600'>{formErrors.password}</span>
            </div>
            <div>
              <input
                type='password'
                name='confirmPassword'
                placeholder='confirm password'
                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
                onChange={handle.handleOnChange}
              />
              <span className='w-100 mb-[1px] text-sm text-red-600'>{formErrors.confirmPassword}</span>
            </div>
            <button
              className='focus:shadow-outline rounded-xl bg-black px-4 py-2 text-white focus:outline-none disabled:bg-gray-500'
              disabled={loading}
            >
              {loading ? 'signing up...' : 'Sign Up'}
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
