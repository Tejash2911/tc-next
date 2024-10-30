export default function SingleReviewSkeleton() {
  return (
    <div className='flex gap-5 font-Urbanist animate-pulse'>
      <div className='h-fit'>
        <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
      </div>
      <div className='w-full'>
        <div className='h-4 bg-gray-300 rounded-xl w-1/12 mb-2'></div>
        <div className='flex items-center gap-2 mb-2'>
          <div className='h-4 bg-gray-300 rounded-xl w-1/5'></div>
        </div>
        <div className='h-4 bg-gray-300 rounded-xl w-1/2 mb-4'></div>
        <div className='flex items-center justify-between'>
          <div className='h-4 bg-gray-300 rounded-xl w-1/12'></div>
          <div className='h-4 bg-gray-300 rounded-xl w-2/12'></div>
        </div>
      </div>
    </div>
  )
}
