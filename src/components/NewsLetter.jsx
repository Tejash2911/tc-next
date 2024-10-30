import SendIcon from '@mui/icons-material/Send'

export default function NewsLetter() {
  return (
    <div className='bg-[#2c3e50] shadow-lg'>
      <div className='container py-12 font-Urbanist flex flex-col justify-center items-center gap-6'>
        <h1 className='text-xl lg:text-2xl font-semibold text-white text-center'>Subscribe to our Newsletter</h1>
        <p className='text-xs sm:text-sm text-white text-center'>and receive up to ₹300 discount on your first order</p>
        <div className='w-4/5 md:w-2/5 bg-white flex rounded-xl overflow-hidden shadow-md'>
          <input
            type='email'
            name='newsletter'
            className='w-3/4 p-1 md:p-2 text-base outline-none focus:outline-none'
            placeholder='Enter your email'
          />
          <button
            aria-label='submit'
            className='grid place-content-center w-1/4 bg-blue-500 text-white transition duration-300 hover:bg-blue-600 focus:outline-none'
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
