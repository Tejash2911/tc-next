import CartItemSkeleton from './CartItemSkeleton'

const SkeletonCartPage = () => (
  <div className='grid lg:grid-cols-2 gap-5'>
    <div className='flex flex-col gap-4'>
      <CartItemSkeleton />
      <CartItemSkeleton />
    </div>
    <div className='flex flex-col gap-2 bg-white border rounded-xl p-4 sm:p-5 h-fit animate-pulse'>
      <div className='h-6 w-1/5 my-2 bg-gray-300 rounded-xl mb-5'></div>
      <div className='flex justify-between my-2'>
        <div className='w-2/5 h-4 bg-gray-300 rounded-xl'></div>
        <div className='w-1/12 h-4 bg-gray-300 rounded-xl'></div>
      </div>
      <div className='flex justify-between my-2'>
        <div className='w-2/5 h-4 bg-gray-300 rounded-xl'></div>
        <div className='w-1/12 h-4 bg-gray-300 rounded-xl'></div>
      </div>
      <div className='flex justify-between font-semibold my-4'>
        <div className='w-1/12 h-4 bg-gray-300 rounded-xl'></div>
        <div className='w-1/12 h-4 bg-gray-300 rounded-xl'></div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='w-4/5 h-12 bg-gray-300 rounded-xl'></div>
      </div>
    </div>
  </div>
)

export default SkeletonCartPage
