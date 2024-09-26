import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Modal from './Modal'
import { setAddress as setReduxAddress } from '@/redux/slices/userSlice'
import { setError } from '@/redux/slices/errorSlice'
import { useState } from 'react'
import { userRequest } from '@/lib/axios'

export default function UpdatePassword({ isOpen, setModal }) {
  const user = useAppSelector(state => state.user.currentUser)
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    currentPass: '',
    password: '',
    confPass: ''
  })

  const handle = {
    onChange: e => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    },
    onSubmit: async e => {
      e.preventDefault()
      if (formData.password !== formData.confPass)
        return dispatch(setError("Password and Confirm Password Does'nt matched!!"))

      try {
        dispatch(setReduxAddress(formData))
        const { data } = await userRequest.put(`/users/${user._id}`, formData)
        dispatch(setError('Password updated Successfully!!'))
      } catch (error) {
        dispatch(setError(error.response.data.error))
      }
      setModal(false)
    }
  }
  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={handle.onSubmit} className='flex flex-col gap-2 max-w-[600px] font-Urbanist'>
        <label htmlFor='currentPass' className='text-xl font-semibold block'>
          Current Password:
        </label>
        <input
          type='text'
          name='currentPass'
          id='currentPass'
          placeholder='Enter Current Password'
          value={formData.currentPass}
          onChange={handle.onChange}
          className='p-2 w-full border border-[#ccc] rounded-md focus:border-[#555]'
          required
        />
        <label htmlFor='password' className='text-xl font-semibold block'>
          New Password:
        </label>
        <input
          type='text'
          name='password'
          id='password'
          placeholder='Enter New Password'
          value={formData.password}
          onChange={handle.onChange}
          className='p-2 w-full border border-[#ccc] rounded-md focus:border-[#555]'
          required
        />
        <label htmlFor='confPass' className='text-xl font-semibold block'>
          Confirm Password:
        </label>
        <input
          type='text'
          name='confPass'
          id='confPass'
          placeholder='Enter Confirm Password'
          value={formData.confPass}
          onChange={handle.onChange}
          className='p-2 w-full border border-[#ccc] rounded-md focus:border-[#555]'
          required
        />
        <div className='flex gap-3'>
          <button type='submit' className='bg-black text-white py-2 px-5 border-none rounded-md hover:bg-[#777]'>
            Submit
          </button>
          <button
            type='reset'
            onClick={() => setModal(false)}
            className='bg-black text-white py-2 px-5 border-none rounded-md hover:bg-[#777]'
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
