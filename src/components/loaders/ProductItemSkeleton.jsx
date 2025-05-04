export const ProductItemSkeleton = () => {
  return (
    <div className='h-fit w-[160px] overflow-hidden rounded-xl bg-gray-100 bg-opacity-30 p-1 shadow-md sm:w-44 md:w-[180px] xl:w-52'>
      {/* Image Placeholder */}
      <div className='flex h-28 animate-pulse items-center justify-center overflow-hidden rounded-xl bg-gray-300 p-10 md:h-32'></div>

      {/* Text and Rating Placeholder */}
      <div className='flex flex-col gap-1 p-2'>
        {/* Title Placeholder */}
        <div className='h-4 w-3/4 rounded-xl bg-gray-200'></div>

        {/* Description Placeholder */}
        <div className='h-3 w-full rounded-xl bg-gray-200'></div>

        {/* Price and Ratings Placeholder */}
        <div className='flex justify-between rounded-xl bg-teal-200 p-1 shadow-sm'>
          {/* Price Placeholder */}
          <div className='h-4 w-12 rounded-xl bg-gray-300'></div>

          {/* Ratings Placeholder */}
          <div className='flex items-center gap-1'>
            <div className='h-4 w-6 rounded-xl bg-gray-300'></div>
            <div className='h-4 w-6 rounded-xl bg-gray-300'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
