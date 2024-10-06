import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Modal from '../Modal'
import { errorActions } from '@/redux/slices/errorSlice'
import { userRequest } from '@/lib/axios'

export default function UpdatePasswordDialog({ open, setOpen }) {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(({ user }) => user)

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
        return dispatch(errorActions.setErrorMessage("Password and Confirm Password Does'nt matched!!"))

      try {
        const { data } = await userRequest.put(`/users/${currentUser._id}`, formData)

        console.log(data)

        dispatch(errorActions.setErrorMessage('Password updated Successfully!!'))
      } catch (error) {
        dispatch(errorActions.setErrorMessage(error.response.data.error))
      }

      handle.handleClose()
    },
    handleClose: () => {
      setOpen(false)
    }
  }

  return (
    <Modal open={open}>
      <form onSubmit={handle.onSubmit} className='flex flex-col gap-2 max-w-[600px] font-Urbanist'>
        <label htmlFor='currentPass' className='text-lg font-semibold block'>
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
        <label htmlFor='password' className='text-lg font-semibold block'>
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
        <label htmlFor='confPass' className='text-lg font-semibold block'>
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
            onClick={handle.handleClose}
            className='bg-black text-white py-2 px-5 border-none rounded-md hover:bg-[#777]'
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
