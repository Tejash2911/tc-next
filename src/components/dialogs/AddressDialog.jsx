import { useState } from 'react'
import Modal from '../Modal'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { errorActions } from '@/redux/slices/errorSlice'
import { countries } from '@/utils/dummyData'
import { userRequest } from '@/lib/axios'

export default function AddressDialog({ open, setOpen, data }) {
  const { currentUser } = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()

  const [address, setAddress] = useState({
    street: data?.street ?? '',
    city: data?.city ?? '',
    state: data?.state ?? '',
    zip: data?.zip ?? '',
    country: data?.country ?? '',
    mobile: currentUser?.number ?? ''
  })

  const handle = {
    onChange: e => {
      setAddress({ ...address, [e.target.name]: e.target.value })
    },
    onSubmit: async e => {
      e.preventDefault()

      try {
        const { data } = await userRequest.post(`/address?${q}`, address)

        console.log(data)
      } catch (error) {
        dispatch(errorActions.setErrorMessage(error?.response?.data?.message))
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
        <label htmlFor='street' className='block font-semibold'>
          Street
        </label>
        <input
          type='text'
          name='street'
          id='street'
          placeholder='enter street'
          value={address.street}
          onChange={handle.onChange}
          className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
          required
        />
        <label htmlFor='city' className='block font-semibold'>
          City
        </label>
        <input
          type='text'
          name='city'
          id='city'
          placeholder='enter city'
          value={address.city}
          onChange={handle.onChange}
          className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
          required
        />
        <label htmlFor='state' className='block font-semibold'>
          State
        </label>
        <input
          type='text'
          name='state'
          id='state'
          placeholder='enter state'
          value={address.state}
          onChange={handle.onChange}
          className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
          required
        />
        <label htmlFor='zip' className='block font-semibold'>
          Zip
        </label>
        <input
          type='text'
          name='zip'
          id='zip'
          placeholder='enter zip code'
          value={address.zip}
          onChange={handle.onChange}
          className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
          required
        />
        <label htmlFor='country' className='block font-semibold'>
          Country
        </label>
        <select
          type='text'
          name='country'
          id='country'
          value={address.country}
          onChange={handle.onChange}
          className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
          required
          autoComplete='true'
        >
          <option value='' hidden>
            Select a country
          </option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <label htmlFor='mobile' className='block font-semibold'>
          Mobile Number
        </label>
        <input
          type='tel'
          name='mobile'
          id='mobile'
          placeholder='enter mobile number'
          value={address.mobile}
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
