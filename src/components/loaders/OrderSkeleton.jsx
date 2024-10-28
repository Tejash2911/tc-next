export default function OrderSkeleton() {
  return (
    <div className='bg-white w-full p-4 sm:p-5 shadow-md rounded-lg animate-pulse'>
      <div className='flex items-center justify-between my-2 flex-wrap gap-2'>
        <div className='bg-gray-300 h-6 w-48 sm:w-56 rounded-md'></div>
        <div className='bg-gray-300 h-6 w-32 sm:w-40 rounded-md'></div>
      </div>
      <hr className='my-3' />
      <div className='grid grid-cols-1 md:grid-cols-3 m-2 max-h-fit h-fit md:h-auto gap-4'>
        <div className='flex flex-col md:flex-row items-center md:items-start gap-4'>
          <div className='bg-gray-300 h-24 w-24 sm:h-28 sm:w-28 rounded-md'></div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='bg-gray-300 h-5 w-40 sm:w-48 rounded-md'></div>
            <div className='flex flex-col gap-1'>
              <div className='bg-gray-300 h-4 w-16 rounded-md'></div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='bg-gray-300 h-5 w-16 sm:w-24 rounded-md'></div>
          <div className='bg-gray-300 h-8 w-20 rounded-full'></div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='bg-gray-300 h-5 w-32 sm:w-48 rounded-md'></div>
          <div className='bg-gray-300 h-6 w-24 sm:w-36 rounded-md'></div>
        </div>
      </div>
      <hr className='my-3' />
    </div>
  )
}
