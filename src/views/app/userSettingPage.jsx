'use client'

import { useEffect, useState } from 'react'
import { errorActions } from '@/redux/slices/errorSlice'
import { updateUser } from '@/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getUserAddress } from '@/redux/slices/addressSlice'
import AddressDialog from '@/components/dialogs/AddressDialog'
import UpdatePasswordDialog from '@/components/dialogs/UpdatePasswordDialog'
import useModal from '@/hooks/use-modal'

const navMap = {
  1: 'Account Details',
  2: 'Delivery Addresses'
}

const UserSettingPage = () => {
  const dispatch = useAppDispatch()
  const { currentUser, loading } = useAppSelector(({ user }) => user)
  const { address } = useAppSelector(({ address }) => address)
  const [isActivated, setIsActivated] = useState(1)

  const addressDialog = useModal()
  const passwordDialog = useModal()

  const [userDataForm, setUserDataForm] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    number: currentUser?.number || ''
  })

  useEffect(() => {
    dispatch(getUserAddress())
  }, [])

  const handle = {
    onChange: e => {
      const { name, value } = e.target

      setUserDataForm(prev => ({ ...prev, [name]: value }))
    },
    updateProfile: async e => {
      e.preventDefault()

      dispatch(updateUser({ id: currentUser?._id, payload: userDataForm }))
        .unwrap()
        .then(res => dispatch(errorActions.setErrorMessage(res?.message)))
        .catch(error => dispatch(errorActions.setErrorMessage(error?.message)))
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
                    <p className='underline cursor-pointer' onClick={() => passwordDialog.onOpen({})}>
                      Edit
                    </p>
                  </div>
                  <button
                    type='submit'
                    className='bg-black text-white text-sm py-2 px-5 border-none rounded-md hover:bg-[#777] disabled:bg-gray-500'
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              )}
              {isActivated === 2 && (
                <div className='flex justify-between'>
                  {address && (
                    <div>
                      <p>Default Delivery Address</p>
                      <p>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
                      <p>{`${address?.street}, ${address?.city}, ${address?.state}, ${address?.country}`}</p>
                      <p>{`${address?.city}, ${address?.zip}`}</p>
                    </div>
                  )}
                  <p className='underline cursor-pointer' onClick={() => addressDialog.onOpen({ ...address })}>
                    {address ? 'Edit' : 'Add'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {addressDialog.isOpen && (
        <AddressDialog open={addressDialog.isOpen} setOpen={addressDialog.onClose} data={addressDialog.selectedRow} />
      )}
      {passwordDialog.isOpen && <UpdatePasswordDialog open={passwordDialog.isOpen} setOpen={passwordDialog.onClose} />}
    </div>
  )
}

export default UserSettingPage
