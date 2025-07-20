'use client'

import { useEffect, useState } from 'react'
import { errorActions } from '@/redux/slices/errorSlice'
import { updateUser } from '@/redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getUserAddress } from '@/redux/slices/addressSlice'
import AddressDialog from '@/components/dialogs/AddressDialog'
import UpdatePasswordDialog from '@/components/dialogs/UpdatePasswordDialog'
import useModal from '@/hooks/use-modal'
import Container from '@/components/Container'

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
    <Container>
      <div className='flex min-h-[40vh] items-center justify-center font-Urbanist'>
        <div className='flex w-full max-w-[1200px] flex-col gap-4 py-5'>
          <h2 className='text-xl font-semibold sm:text-2xl'>Settings</h2>
          <div className='flex flex-col gap-4 md:flex-row md:gap-40'>
            {/* Navigation Links */}
            <div className='flex flex-row gap-2 text-sm sm:text-base md:flex-col'>
              <a
                onClick={() => setIsActivated(1)}
                className={`cursor-pointer decoration-black ${isActivated === 1 && 'text-teal-700'}`}
              >
                Account Details
              </a>
              <a
                onClick={() => setIsActivated(2)}
                className={`cursor-pointer decoration-black ${isActivated === 2 && 'text-teal-700'}`}
              >
                Delivery Addresses
              </a>
            </div>

            {/* Content Section */}
            <div className='flex flex-col items-start gap-5 sm:w-[60%] md:w-[50%]'>
              <h2 className='text-base font-semibold sm:text-lg'>{navMap[isActivated]}</h2>
              {isActivated === 1 && (
                <form onSubmit={handle.updateProfile} className='flex w-full flex-col gap-2 text-xs sm:text-sm'>
                  <p className='font-semibold'>First name</p>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First name'
                    value={userDataForm.firstName}
                    onChange={handle.onChange}
                    className='rounded-xl border border-[#ccc] p-2'
                  />
                  <p className='font-semibold'>Last name</p>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last name'
                    value={userDataForm.lastName}
                    onChange={handle.onChange}
                    className='rounded-xl border border-[#ccc] p-2'
                  />
                  <p className='font-semibold'>Email address</p>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={userDataForm.email}
                    onChange={handle.onChange}
                    className='rounded-xl border border-[#ccc] p-2'
                    autoComplete='true'
                  />
                  <p className='font-semibold'>Number</p>
                  <input
                    type='tel'
                    name='number'
                    placeholder='Phone number'
                    value={userDataForm.number}
                    onChange={handle.onChange}
                    className='rounded-xl border border-[#ccc] p-2'
                  />
                  <p className='font-semibold'>Password</p>
                  <div className='flex justify-between rounded-xl border border-[#ccc] p-2'>
                    *************
                    <p className='cursor-pointer underline' onClick={() => passwordDialog.onOpen({})}>
                      Edit
                    </p>
                  </div>
                  <button
                    type='submit'
                    className='w-fit rounded-xl border-none bg-black px-5 py-2 text-white hover:bg-[#777] disabled:bg-gray-500'
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              )}
              {isActivated === 2 && (
                <div className='flex flex-col gap-2 text-xs sm:text-sm'>
                  {address && (
                    <div className='flex flex-col gap-2'>
                      <p>Default Delivery Address</p>
                      <p>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>
                      <p>{`${address?.street}, ${address?.city}, ${address?.state}, ${address?.country}`}</p>
                      <p>{`${address?.city}, ${address?.zip}`}</p>
                    </div>
                  )}
                  <p className='cursor-pointer underline' onClick={() => addressDialog.onOpen({ ...address })}>
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
    </Container>
  )
}

export default UserSettingPage
