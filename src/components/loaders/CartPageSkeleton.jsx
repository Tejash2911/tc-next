import CartItemSkeleton from './CartItemSkeleton'

const SkeletonCartPage = () => (
  <div className='grid lg:grid-cols-2 gap-5'>
    <div className='flex flex-col gap-2'>
      <CartItemSkeleton />
      <CartItemSkeleton />
    </div>
    <div className='flex flex-col gap-2 border rounded-3xl p-3 h-fit'>
      <div className='h-6 w-1/5 my-2 bg-gray-200 rounded mb-5'></div>
      <div className='flex justify-between my-2'>
        <div className='w-2/5 h-4 bg-gray-200 rounded'></div>
        <div className='w-1/12 h-4 bg-gray-200 rounded'></div>
      </div>
      <div className='flex justify-between my-2'>
        <div className='w-2/5 h-4 bg-gray-200 rounded'></div>
        <div className='w-1/12 h-4 bg-gray-200 rounded'></div>
      </div>
      <div className='flex justify-between font-semibold my-4'>
        <div className='w-1/12 h-4 bg-gray-200 rounded'></div>
        <div className='w-1/12 h-4 bg-gray-200 rounded'></div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='w-4/5 h-12 bg-gray-200 rounded'></div>
      </div>
    </div>
  </div>
)

export default SkeletonCartPage
