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
      <form onSubmit={handle.onSubmit} className='font-Urbanist flex flex-col gap-2'>
        <label htmlFor='street' className='text-lg font-semibold block'>
          Street
        </label>
        <input
          type='text'
          name='street'
          id='street'
          placeholder='enter street'
          value={address.street}
          onChange={handle.onChange}
          className='p-2 text-lg w-full border border-[#ccc] rounded-xl focus:border-[#555]'
          required
        />
        <label htmlFor='city' className='text-lg font-semibold block'>
          City
        </label>
        <input
          type='text'
          name='city'
          id='city'
          placeholder='enter city'
          value={address.city}
          onChange={handle.onChange}
          className='p-2 text-lg w-full border border-[#ccc] rounded-xl focus:border-[#555]'
          required
        />
        <label htmlFor='state' className='text-lg font-semibold block'>
          State
        </label>
        <input
          type='text'
          name='state'
          id='state'
          placeholder='enter state'
          value={address.state}
          onChange={handle.onChange}
          className='p-2 text-lg w-full border border-[#ccc] rounded-xl focus:border-[#555]'
          required
        />
        <label htmlFor='zip' className='text-lg font-semibold block'>
          Zip
        </label>
        <input
          type='text'
          name='zip'
          id='zip'
          placeholder='enter zip code'
          value={address.zip}
          onChange={handle.onChange}
          className='p-2 text-lg w-full border border-[#ccc] rounded-xl focus:border-[#555]'
          required
        />
        <label htmlFor='country' className='text-lg font-semibold block'>
          Country
        </label>
        <select
          type='text'
          name='country'
          id='country'
          value={address.country}
          onChange={handle.onChange}
          className='p-2 text-lg w-full border border-[#ccc] rounded-xl focus:border-[#555]'
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
        <label htmlFor='mobile' className='text-lg font-semibold block'>
          Mobile Number
        </label>
        <input
          type='tel'
          name='mobile'
          id='mobile'
          placeholder='enter mobile number'
          value={address.mobile}
          onChange={handle.onChange}
          className='p-2 text-lg w-full border border-[#ccc] rounded-xl focus:border-[#555]'
          required
        />
        <div className='flex gap-3'>
          <button type='submit' className='bg-black text-white py-2 px-5 border-none rounded-xl hover:bg-[#777]'>
            Submit
          </button>
          <button
            type='reset'
            onClick={handle.handleClose}
            className='bg-black text-white py-2 px-5 border-none rounded-xl hover:bg-[#777]'
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
