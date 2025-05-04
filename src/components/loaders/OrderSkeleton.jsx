import React from 'react'

export default function SingleOrderSkeleton() {
  return (
    <div className='w-full animate-pulse rounded-xl bg-white p-4 shadow-md sm:p-5'>
      {/* Header skeleton */}
      <div className='flex items-center justify-between gap-2'>
        <span className='h-6 w-32 rounded-xl bg-teal-700 sm:w-52'></span>
        <span className='h-5 w-28 rounded-xl bg-gray-300'></span>
      </div>
      <hr className='my-2' />

      {/* Product items skeleton */}
      <div className='grid h-fit max-h-fit gap-4 md:h-auto md:grid-cols-3'>
        <div className='flex flex-col items-center gap-4 md:flex-row'>
          <div className='h-24 w-24 rounded-xl bg-gray-300'></div>
          <div className='flex w-full flex-col justify-center gap-2'>
            <div className='h-4 w-20 rounded-xl bg-gray-300'></div>
            <div className='h-4 w-16 rounded-xl bg-gray-300'></div>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 sm:flex-col'>
          <span className='h-4 w-12 rounded-xl bg-gray-300'></span>
          <span className='h-6 w-20 rounded-full bg-gray-300'></span>
        </div>
        <div className='flex items-center justify-center gap-2 sm:flex-col'>
          <span className='h-4 w-20 rounded-xl bg-gray-300'></span>
          <span className='h-4 w-32 rounded-xl bg-gray-300'></span>
        </div>
      </div>

      <hr className='mt-2' />
    </div>
  )
}
