import CartItemSkeleton from './CartItemSkeleton'

const SkeletonCartPage = () => (
  <div className='grid gap-5 lg:grid-cols-2'>
    <div className='flex flex-col gap-4'>
      <CartItemSkeleton />
      <CartItemSkeleton />
    </div>
    <div className='flex h-fit animate-pulse flex-col gap-2 rounded-xl border bg-white p-4 sm:p-5'>
      <div className='my-2 mb-5 h-6 w-1/5 rounded-xl bg-gray-300'></div>
      <div className='my-2 flex justify-between'>
        <div className='h-4 w-2/5 rounded-xl bg-gray-300'></div>
        <div className='h-4 w-1/12 rounded-xl bg-gray-300'></div>
      </div>
      <div className='my-2 flex justify-between'>
        <div className='h-4 w-2/5 rounded-xl bg-gray-300'></div>
        <div className='h-4 w-1/12 rounded-xl bg-gray-300'></div>
      </div>
      <div className='my-4 flex justify-between font-semibold'>
        <div className='h-4 w-1/12 rounded-xl bg-gray-300'></div>
        <div className='h-4 w-1/12 rounded-xl bg-gray-300'></div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='h-12 w-4/5 rounded-xl bg-gray-300'></div>
      </div>
    </div>
  </div>
)

export default SkeletonCartPage
