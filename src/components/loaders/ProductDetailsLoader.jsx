import React from 'react'

const ProductDetailsLoader = () => {
  return (
    <div className='container'>
      <div className='grid md:grid-cols-2 gap-5 font-Urbanist py-5 animate-pulse'>
        {/* Image Skeleton */}
        <div className='flex items-center overflow-hidden'>
          <div className='h-[200px] w-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-gray-300' />
        </div>

        {/* Details Skeleton */}
        <div className='grid gap-5'>
          <div className='w-2/3 h-6 bg-gray-300 rounded-xl' />
          <div className='w-2/4 h-5 bg-gray-300 rounded-xl' />

          <div className='h-5 bg-gray-300 rounded-xl'></div>

          <div className='w-1/4 h-5 bg-gray-300 rounded-xl'></div>

          <span className='w-1/3 h-5 bg-gray-300 rounded-xl' />

          {/* Color and Size Selectors Skeleton */}
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center'>
              <div className='w-10 h-5 bg-gray-300 rounded-xl mr-2' />
              <div className='w-5 h-5 bg-gray-300 rounded-full ml-1'></div>
              <div className='w-5 h-5 bg-gray-300 rounded-full ml-1'></div>
            </div>

            <div className='flex items-center'>
              <div className='w-10 h-6 bg-gray-300 rounded-xl mr-2' />
              <div className='w-24 h-6 bg-gray-300 rounded-xl' />
            </div>
          </div>

          {/* Quantity and Buttons Skeleton */}
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center gap-2'>
              <div className='w-5 h-5 bg-gray-300 rounded-full' />
              <div className='w-7 h-7 bg-gray-300 rounded-xl grid place-content-center' />
              <div className='w-5 h-5 bg-gray-300 rounded-full' />
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-24 h-6 bg-gray-300 rounded-xl' />
              <div className='w-24 h-6 bg-gray-300 rounded-xl' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsLoader
