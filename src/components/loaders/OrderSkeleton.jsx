import React from 'react'

export default function SingleOrderSkeleton() {
  return (
    <div className='bg-white w-full p-4 sm:p-5 shadow-md rounded-xl animate-pulse'>
      {/* Header skeleton */}
      <div className='flex items-center justify-between gap-2'>
        <span className='bg-teal-700 h-6 w-32 sm:w-52 rounded-xl'></span>
        <span className='h-5 w-28 bg-gray-300 rounded-xl'></span>
      </div>
      <hr className='my-2' />

      {/* Product items skeleton */}
      <div className='grid md:grid-cols-3 max-h-fit h-fit md:h-auto gap-4'>
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <div className='bg-gray-300 w-24 h-24 rounded-xl'></div>
          <div className='flex flex-col justify-center gap-2 w-full'>
            <div className='bg-gray-300 h-4 w-20 rounded-xl'></div>
            <div className='bg-gray-300 h-4 w-16 rounded-xl'></div>
          </div>
        </div>
        <div className='flex sm:flex-col items-center justify-center gap-2'>
          <span className='bg-gray-300 h-4 w-12 rounded-xl'></span>
          <span className='bg-gray-300 h-6 w-20 rounded-full'></span>
        </div>
        <div className='flex sm:flex-col items-center justify-center gap-2'>
          <span className='bg-gray-300 h-4 w-20 rounded-xl'></span>
          <span className='bg-gray-300 h-4 w-32 rounded-xl'></span>
        </div>
      </div>

      <hr className='mt-2' />
    </div>
  )
}
