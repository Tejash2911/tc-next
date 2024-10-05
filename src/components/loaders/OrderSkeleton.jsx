export default function OrderSkeleton() {
  return (
    <div className='bg-white w-full p-3 pt-2 shadow-md rounded-lg animate-pulse'>
      <div className='flex items-center justify-between my-2 flex-wrap'>
        <div className='bg-gray-300 h-6 w-56 rounded-md'></div>
        <div className='bg-gray-300 h-6 w-56 rounded-md'></div>
      </div>
      <hr className='my-3' />
      <div className='grid grid-cols-3 m-2 max-h-fit h-[200px] gap-6'>
        <div className='h-full flex items-center gap-6'>
          <div className='bg-gray-300 h-[100px] w-[100px] rounded-md'></div>
          <div className='flex flex-col justify-center gap-5'>
            <div className='bg-gray-300 h-5 w-64 rounded-md'></div>
            <div className='flex flex-col gap-1'>
              <div className='bg-gray-300 h-4 w-16 rounded-md'></div>
              <div className='bg-gray-300 h-4 w-24 rounded-md'></div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='bg-gray-300 h-5 w-24 rounded-md'></div>
          <div className='bg-gray-300 h-8 w-20 rounded-full'></div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='bg-gray-300 h-5 w-48 rounded-md'></div>
          <div className='bg-gray-300 h-6 w-36 rounded-md'></div>
        </div>
      </div>
      <hr className='my-3' />
    </div>
  )
}
