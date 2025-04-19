const CartItemSkeleton = () => {
  return (
    <div className='relative flex animate-pulse flex-col rounded-xl bg-white p-4 shadow-sm sm:p-5 md:flex-row'>
      {/* Delete Icon Skeleton */}
      <div className='absolute right-2 top-2 h-6 w-6 rounded-full bg-gray-300'></div>

      {/* Product Image and Info Skeleton */}
      <div className='flex w-full flex-col items-center justify-between gap-4 md:flex-row'>
        {/* Image Skeleton */}
        <div className='h-24 w-24 rounded-xl bg-gray-300'></div>

        {/* Product Details Skeleton */}
        <div className='flex w-full flex-col gap-2'>
          <div className='h-4 w-28 rounded-xl bg-gray-300'></div>
          <div className='h-4 w-20 rounded-xl bg-gray-300'></div>
          <div className='inline-flex items-center gap-2'>
            <div className='h-4 w-16 rounded-xl bg-gray-300'></div>
            <div className='h-4 w-4 rounded-full bg-gray-300'></div>
          </div>
          <div className='h-4 w-16 rounded-xl bg-gray-300'></div>
        </div>

        {/* Quantity and Price Skeleton */}
        <div className='flex w-full flex-col items-center md:w-1/4'>
          <div className='flex items-center gap-2'>
            <div className='h-6 w-6 rounded-full bg-gray-300'></div>
            <div className='h-6 w-8 rounded-xl bg-gray-300'></div>
            <div className='h-6 w-6 rounded-full bg-gray-300'></div>
          </div>
          <div className='mt-2 h-4 w-16 rounded-xl bg-gray-300'></div>
        </div>
      </div>
    </div>
  )
}

export default CartItemSkeleton
