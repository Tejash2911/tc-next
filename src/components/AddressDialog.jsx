import { useState } from 'react'
import Modal from './Modal'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setError } from '@/redux/slices/errorSlice'
import { countries } from '@/utils/dummyData'
import { userRequest } from '@/lib/axios'

export default function AddressDialog({ isOpen, setModal }) {
  const { currentUser } = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    mobile: currentUser?.number || ''
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
        dispatch(setError(error?.response?.data?.message))
      }

      setModal(false)
    }
  }

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={handle.onSubmit} className='font-Urbanist flex flex-col gap-2'>
        <label htmlFor='street' className='text-xl font-semibold block'>
          Street
        </label>
        <input
          type='text'
          name='street'
          id='street'
          placeholder='enter street'
          value={address.street}
          onChange={handle.onChange}
          className='p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]'
          required
        />
        <label htmlFor='city' className='text-xl font-semibold block'>
          City
        </label>
        <input
          type='text'
          name='city'
          id='city'
          placeholder='enter city'
          value={address.city}
          onChange={handle.onChange}
          className='p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]'
          required
        />
        <label htmlFor='state' className='text-xl font-semibold block'>
          State
        </label>
        <input
          type='text'
          name='state'
          id='state'
          placeholder='enter state'
          value={address.state}
          onChange={handle.onChange}
          className='p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]'
          required
        />
        <label htmlFor='zip' className='text-xl font-semibold block'>
          Zip
        </label>
        <input
          type='text'
          name='zip'
          id='zip'
          placeholder='enter zip code'
          value={address.zip}
          onChange={handle.onChange}
          className='p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]'
          required
        />
        <label htmlFor='country' className='text-xl font-semibold block'>
          Country
        </label>
        <select
          type='text'
          name='country'
          id='country'
          value={address.country}
          onChange={handle.onChange}
          className='p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]'
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
        <label htmlFor='mobile' className='text-xl font-semibold block'>
          Mobile Number
        </label>
        <input
          type='tel'
          name='mobile'
          id='mobile'
          placeholder='enter mobile number'
          value={address.mobile}
          onChange={handle.onChange}
          className='p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]'
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
