export default function SingleReviewSkeleton() {
  return (
    <div className='flex animate-pulse gap-5 font-Urbanist'>
      <div className='h-fit'>
        <div className='h-10 w-10 rounded-full bg-gray-300'></div>
      </div>
      <div className='w-full'>
        <div className='mb-2 h-4 w-1/12 rounded-xl bg-gray-300'></div>
        <div className='mb-2 flex items-center gap-2'>
          <div className='h-4 w-1/5 rounded-xl bg-gray-300'></div>
        </div>
        <div className='mb-4 h-4 w-1/2 rounded-xl bg-gray-300'></div>
        <div className='flex items-center justify-between'>
          <div className='h-4 w-1/12 rounded-xl bg-gray-300'></div>
          <div className='h-4 w-2/12 rounded-xl bg-gray-300'></div>
        </div>
      </div>
    </div>
  )
}
