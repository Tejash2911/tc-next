import CartItemSkeleton from './CartItemSkeleton'

const SkeletonCartPage = () => (
  <div className='p-5 font-Urbanist'>
    <div className='text-center font-light'>
      <div className='h-8 w-1/3 bg-gray-200 rounded mx-auto'></div>
    </div>
    <div className='flex items-center justify-between p-5'>
      <div className='w-1/4 h-10 bg-gray-200 rounded'></div>
      <div className='hidden md:block w-1/4 h-6 bg-gray-200 rounded'></div>
      <div className='w-1/4 h-10 bg-gray-200 rounded'></div>
    </div>
    <div className='grid lg:grid-cols-2 gap-5'>
      <div className='flex flex-col'>
        <CartItemSkeleton />
      </div>
      <div className='flex flex-col gap-2 border rounded-3xl p-5 h-fit'>
        <div className='h-8 w-1/3 bg-gray-200 rounded mb-5'></div>
        <div className='flex justify-between my-2'>
          <div className='w-3/5 h-5 bg-gray-200 rounded'></div>
          <div className='w-1/5 h-5 bg-gray-200 rounded'></div>
        </div>
        {/* <div className='flex justify-between my-2'>
          <div className='w-3/5 h-5 bg-gray-200 rounded'></div>
          <div className='w-1/5 h-5 bg-gray-200 rounded'></div>
        </div> */}
        <div className='flex justify-between font-semibold my-4'>
          <div className='w-1/3 h-5 bg-gray-200 rounded'></div>
          <div className='w-1/3 h-5 bg-gray-200 rounded'></div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-4/5 h-12 bg-gray-200 rounded'></div>
        </div>
      </div>
    </div>
  </div>
)

export default SkeletonCartPage
