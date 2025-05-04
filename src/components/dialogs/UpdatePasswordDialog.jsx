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
      <form onSubmit={handle.onSubmit} className='flex flex-col gap-2 font-Urbanist text-xs sm:text-sm'>
        <label htmlFor='currentPass' className='block font-semibold'>
          Current Password:
        </label>
        <input
          type='text'
          name='currentPass'
          id='currentPass'
          placeholder='Enter Current Password'
          value={formData.currentPass}
          onChange={handle.onChange}
          className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
          required
        />
        <label htmlFor='password' className='block font-semibold'>
          New Password:
        </label>
        <input
          type='text'
          name='password'
          id='password'
          placeholder='Enter New Password'
          value={formData.password}
          onChange={handle.onChange}
          className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
          required
        />
        <label htmlFor='confPass' className='block font-semibold'>
          Confirm Password:
        </label>
        <input
          type='text'
          name='confPass'
          id='confPass'
          placeholder='Enter Confirm Password'
          value={formData.confPass}
          onChange={handle.onChange}
          className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
          required
        />
        <div className='flex gap-3'>
          <button type='submit' className='rounded-xl border-none bg-black px-5 py-2 text-white hover:bg-[#777]'>
            Submit
          </button>
          <button
            type='reset'
            onClick={handle.handleClose}
            className='rounded-xl border-none bg-black px-5 py-2 text-white hover:bg-[#777]'
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
