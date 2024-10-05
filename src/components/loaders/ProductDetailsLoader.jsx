import React from 'react'

const ProductDetailsLoader = () => {
  return (
    <div className='container'>
      <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-5 font-Urbanist p-10 animate-pulse'>
        {/* Image Skeleton */}
        <div className='flex items-center justify-center cursor-zoom-in overflow-hidden'>
          <div className='w-[400px] h-[400px] bg-gray-300' />
        </div>

        {/* Details Skeleton */}
        <div className='grid gap-7'>
          <div className='flex items-center justify-between'>
            <div className='w-2/3 h-8 bg-gray-300 rounded' />
            <div className='w-1/4 h-8 bg-gray-300 rounded' />
          </div>

          <div className='h-24 bg-gray-300 rounded'></div>

          <div className='w-1/4 h-8 bg-gray-300 rounded'></div>

          <span className='w-1/3 h-6 bg-gray-300 rounded' />

          {/* Color and Size Selectors Skeleton */}
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center'>
              <div className='w-10 h-6 bg-gray-300 rounded mr-2' />
              <div className='w-5 h-5 bg-gray-300 rounded-full ml-1'></div>
              <div className='w-5 h-5 bg-gray-300 rounded-full ml-1'></div>
            </div>

            <div className='flex items-center'>
              <div className='w-10 h-6 bg-gray-300 rounded mr-2' />
              <div className='w-24 h-10 bg-gray-300 rounded' />
            </div>
          </div>

          {/* Quantity and Buttons Skeleton */}
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center'>
              <div className='w-8 h-8 bg-gray-300 rounded-full mx-2' />
              <div className='w-10 h-10 bg-gray-300 rounded-md grid place-content-center' />
              <div className='w-8 h-8 bg-gray-300 rounded-full mx-2' />
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-24 h-10 bg-gray-300 rounded' />
              <div className='w-24 h-10 bg-gray-300 rounded' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsLoader
