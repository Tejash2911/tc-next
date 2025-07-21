import React from 'react'

const ProductDetailsLoader = () => {
  return (
    <div className='container'>
      <div className='grid animate-pulse gap-5 py-5 font-Urbanist md:grid-cols-2'>
        {/* Image Skeleton */}
        <div className='flex items-center overflow-hidden'>
          <div className='h-[200px] w-[200px] bg-gray-300 sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]' />
        </div>

        {/* Details Skeleton */}
        <div className='grid gap-5'>
          <div className='h-6 w-2/3 rounded-xl bg-gray-300' />
          <div className='h-5 w-2/4 rounded-xl bg-gray-300' />

          <div className='h-5 rounded-xl bg-gray-300'></div>

          <div className='h-5 w-1/4 rounded-xl bg-gray-300'></div>

          <span className='h-5 w-1/3 rounded-xl bg-gray-300' />

          {/* Color and Size Selectors Skeleton */}
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center'>
              <div className='mr-2 h-5 w-10 rounded-xl bg-gray-300' />
              <div className='ml-1 h-5 w-5 rounded-full bg-gray-300'></div>
              <div className='ml-1 h-5 w-5 rounded-full bg-gray-300'></div>
            </div>

            <div className='flex items-center'>
              <div className='mr-2 h-6 w-10 rounded-xl bg-gray-300' />
              <div className='h-6 w-24 rounded-xl bg-gray-300' />
            </div>
          </div>

          {/* Quantity and Buttons Skeleton */}
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center gap-2'>
              <div className='h-5 w-5 rounded-full bg-gray-300' />
              <div className='grid h-7 w-7 place-content-center rounded-xl bg-gray-300' />
              <div className='h-5 w-5 rounded-full bg-gray-300' />
            </div>
            <div className='flex items-center gap-3'>
              <div className='h-6 w-24 rounded-xl bg-gray-300' />
              <div className='h-6 w-24 rounded-xl bg-gray-300' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsLoader
