import { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import Modal from '../Modal'
import { messageActions } from '@/redux/slices/messageSlice'
import { useCurrentUser, useUpdateUser } from '@/hooks/useUserQueries'

export default function UpdatePasswordDialog({ open, setOpen }) {
  const dispatch = useAppDispatch()
  const { data: currentUser } = useCurrentUser()
  const updatePasswordMutation = useUpdateUser()

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
        return dispatch(messageActions.setMessage("Password and Confirm Password Doesn't matched!!"))

      try {
        const res = await updatePasswordMutation.mutateAsync({
          userId: currentUser._id,
          password: formData.password,
          currentPassword: formData.currentPass
        })

        dispatch(messageActions.setMessage(res?.message))
        handle.handleClose()
      } catch (error) {
        dispatch(messageActions.setMessage(error?.message))
      }
    },
    handleClose: () => {
      setOpen(false)
    }
  }

  return (
    <Modal open={open}>
      <form onSubmit={handle.onSubmit} className='flex flex-col gap-2 text-xs sm:text-sm'>
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
