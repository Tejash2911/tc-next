import { Icon } from '@iconify/react'

export default function NewsLetter() {
  return (
    <div className='bg-[#2c3e50] shadow-lg'>
      <div className='container flex flex-col items-center justify-center gap-6 py-12 font-Urbanist'>
        <h1 className='text-center text-xl font-semibold text-white lg:text-2xl'>Subscribe to our Newsletter</h1>
        <p className='text-center text-xs text-white sm:text-sm'>and receive up to ₹300 discount on your first order</p>
        <div className='flex w-4/5 overflow-hidden rounded-xl bg-white shadow-md md:w-2/5'>
          <input
            type='email'
            name='newsletter'
            className='w-3/4 p-1 text-base outline-none focus:outline-none md:p-2'
            placeholder='Enter your email'
          />
          <button
            aria-label='submit'
            className='grid w-1/4 place-content-center bg-blue-500 text-white transition duration-300 hover:bg-blue-600 focus:outline-none'
          >
            <Icon icon='ri:send-plane-2-fill' width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  )
}
