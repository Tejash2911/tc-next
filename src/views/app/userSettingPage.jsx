'use client'

import GetUserAddress from '@/components/GetUserAddress'
import UpdatePassword from '@/components/UpdatePassword'
import { setError } from '@/redux/slices/errorSlice'
import { setAddress, updateUser } from '@/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import { userRequest } from '@/lib/axios'

const navMap = {
  1: 'Account Details',
  2: 'Delivery Addresses'
}

const UserSettingPage = () => {
  const dispatch = useAppDispatch()
  const userAddress = useAppSelector(state => state.user.address)
  const user = useAppSelector(state => state.user.currentUser)
  const [isActivated, setIsActivated] = useState(1)
  const [isAddressOpen, setAddressOpen] = useState(false)
  const [isEditPassOpen, setIsEditPassOpen] = useState(false)

  const [userDataForm, setUserDataForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    number: user?.number || ''
  })

  useEffect(() => {
    if (!userAddress) {
      ;(async () => {
        try {
          const { data } = await userRequest.get('/user/address')
          dispatch(setAddress(data.address))
        } catch (error) {
          dispatch(setError('Failed to fetch Address!!'))
        }
      })()
    }
  }, [dispatch, userAddress])

  const handle = {
    onChange: e => {
      const { name, value } = e.target
      setUserDataForm(prev => ({ ...prev, [name]: value }))
    },
    updateProfile: async e => {
      e.preventDefault()
      try {
        const { data } = await userRequest.put(`/user/${user?._id}`, userDataForm)
        dispatch(setError('Profile updated Successfully!!'))
        dispatch(updateUser(data))
      } catch (error) {
        console.error(error)
        dispatch(setError('Failed to update Profile!!'))
      }
    }
  }

  return (
    <div className='container'>
      <div className='flex items-center justify-center  font-Urbanist'>
        <div className='flex flex-col gap-4 w-[1200px] py-12'>
          <h2 className='text-2xl font-semibold mb-5'>Settings</h2>
          <div className='flex justify-start gap-4'>
            <div className='flex flex-col w-[20%]'>
              <a onClick={() => setIsActivated(1)} className='decoration-black mb-2 cursor-pointer hover:text-[#777]'>
                Account Details
              </a>
              <a onClick={() => setIsActivated(2)} className='decoration-black mb-2 cursor-pointer hover:text-[#777]'>
                Delivery Addresses
              </a>
            </div>
            <div className='flex flex-col items-start w-[500px] max-w-[100%]'>
              <h2 className='text-2xl font-semibold mb-5'>{navMap[isActivated]}</h2>
              {isActivated === 1 && (
                <form onSubmit={handle.updateProfile} className='w-full'>
                  <p>First name</p>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First name'
                    value={userDataForm.firstName}
                    onChange={handle.onChange}
                    className='w-full mb-2 p-2 rounded-md border border-[#ccc]'
                  />
                  <p>Last name</p>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last name'
                    value={userDataForm.lastName}
                    onChange={handle.onChange}
                    className='w-full mb-2 p-2 rounded-md border border-[#ccc]'
                  />
                  <p>Email address</p>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={userDataForm.email}
                    onChange={handle.onChange}
                    className='w-full mb-2 p-2 rounded-md border border-[#ccc]'
                    autoComplete='true'
                  />
                  <p>Number</p>
                  <input
                    type='tel'
                    name='number'
                    placeholder='Phone number'
                    value={userDataForm.number}
                    onChange={handle.onChange}
                    className='w-full mb-2 p-2 rounded-md border border-[#ccc]'
                  />
                  <p>Password</p>
                  <div className='flex justify-between w-full border border-[#ccc] rounded-md p-2 mb-2'>
                    *************
                    <p className='underline cursor-pointer' onClick={() => setIsEditPassOpen(true)}>
                      Edit
                    </p>
                  </div>
                  <button
                    type='submit'
                    className='bg-black text-white text-sm py-2 px-5 border-none rounded-md hover:bg-[#777]'
                  >
                    Save Changes
                  </button>
                </form>
              )}
              {isActivated === 2 && (
                <div className='flex justify-between'>
                  <div>
                    <p>Default Delivery Address</p>
                    <p>{`${user?.firstName} ${user?.lastName}`}</p>
                    <p>{`${userAddress?.street}, ${userAddress?.city}, ${userAddress?.state}, ${userAddress?.country}`}</p>
                    <p>{`${userAddress?.city}, ${userAddress?.zip}`}</p>
                  </div>
                  <p className='underline cursor-pointer' onClick={() => setAddressOpen(true)}>
                    Edit
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <GetUserAddress isOpen={isAddressOpen} setModal={setAddressOpen} prevAdd={userAddress} />
      <UpdatePassword isOpen={isEditPassOpen} setModal={setIsEditPassOpen} />
    </div>
  )
}

export default UserSettingPage
