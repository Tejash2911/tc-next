export const ProductItemSkeleton = () => {
  return (
    <div className='w-[160px] sm:w-44 md:w-[180px] xl:w-52 h-fit overflow-hidden shadow-md bg-opacity-30 bg-gray-100 rounded-xl p-1'>
      {/* Image Placeholder */}
      <div className='flex items-center justify-center overflow-hidden p-10 h-28 md:h-32 bg-gray-300 rounded-xl animate-pulse'></div>

      {/* Text and Rating Placeholder */}
      <div className='flex flex-col p-2 gap-1'>
        {/* Title Placeholder */}
        <div className='h-4 bg-gray-200 rounded-xl w-3/4'></div>

        {/* Description Placeholder */}
        <div className='h-3 bg-gray-200 rounded-xl w-full'></div>

        {/* Price and Ratings Placeholder */}
        <div className='flex justify-between bg-teal-200 shadow-sm p-1 rounded-xl'>
          {/* Price Placeholder */}
          <div className='w-12 h-4 bg-gray-300 rounded-xl'></div>

          {/* Ratings Placeholder */}
          <div className='flex gap-1 items-center'>
            <div className='w-6 h-4 bg-gray-300 rounded-xl'></div>
            <div className='w-6 h-4 bg-gray-300 rounded-xl'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
