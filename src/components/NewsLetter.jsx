import SendIcon from '@mui/icons-material/Send'

export default function NewsLetter() {
  return (
    <div className='h-auto py-14 font-Urbanist bg-[#2c3e50] flex flex-col justify-center items-center gap-6 shadow-lg'>
      <h1 className='text-2xl lg:text-3xl font-semibold text-white text-center'>Subscribe to our Newsletter</h1>
      <p className='text-xs md:text-base text-white text-center'>and receive up to ₹300 discount on your first order</p>
      <div className='w-4/5 md:w-2/5 bg-white flex rounded-lg overflow-hidden shadow-md'>
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
  )
}
