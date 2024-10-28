const CartItemSkeleton = () => (
  <div className='flex flex-col md:flex-row p-2 rounded-xl shadow-sm overflow-hidden bg-gray-200 animate-pulse'>
    <div className='flex items-center w-full p-3'>
      <div className='w-[120px] h-[120px] bg-gray-300 rounded-md'></div>
    </div>

    <div className='flex flex-col justify-around p-2 w-full'>
      <div className='h-4 w-3/4 bg-gray-300 rounded mb-2'></div>
      <div className='h-4 w-1/2 bg-gray-300 rounded mb-2'></div>
      <div className='h-4 w-1/4 bg-gray-300 rounded mb-2'></div>
      <div className='h-4 w-1/4 bg-gray-300 rounded'></div>
    </div>

    <div className='flex flex-col justify-center items-center w-full p-2'>
      <div className='flex items-center'>
        <div className='w-6 h-6 bg-gray-300 rounded-full mx-2'></div>
        <div className='w-8 h-8 bg-gray-300 rounded-md mx-2'></div>
        <div className='w-6 h-6 bg-gray-300 rounded-full mx-2'></div>
      </div>
      <div className='h-5 w-16 bg-gray-300 rounded my-4'></div>
    </div>
  </div>
)

export default CartItemSkeleton
