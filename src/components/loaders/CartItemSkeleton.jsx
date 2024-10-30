const CartItemSkeleton = () => {
  return (
    <div className='flex flex-col md:flex-row p-4 sm:p-5 rounded-xl shadow-sm bg-white relative animate-pulse'>
      {/* Delete Icon Skeleton */}
      <div className='absolute top-2 right-2 h-6 w-6 bg-gray-300 rounded-full'></div>

      {/* Product Image and Info Skeleton */}
      <div className='flex flex-col md:flex-row items-center justify-between gap-4 w-full'>
        {/* Image Skeleton */}
        <div className='w-24 h-24 bg-gray-300 rounded-xl'></div>

        {/* Product Details Skeleton */}
        <div className='flex flex-col gap-2 w-full'>
          <div className='h-4 w-28 bg-gray-300 rounded-xl'></div>
          <div className='h-4 w-20 bg-gray-300 rounded-xl'></div>
          <div className='inline-flex items-center gap-2'>
            <div className='h-4 w-16 bg-gray-300 rounded-xl'></div>
            <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
          </div>
          <div className='h-4 w-16 bg-gray-300 rounded-xl'></div>
        </div>

        {/* Quantity and Price Skeleton */}
        <div className='flex flex-col items-center w-full md:w-1/4'>
          <div className='flex items-center gap-2'>
            <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
            <div className='h-6 w-8 bg-gray-300 rounded-xl'></div>
            <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
          </div>
          <div className='mt-2 h-4 w-16 bg-gray-300 rounded-xl'></div>
        </div>
      </div>
    </div>
  )
}

export default CartItemSkeleton
