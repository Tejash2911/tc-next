const CartItemSkeleton = () => (
  <div className='flex flex-col md:flex-row h-fit my-2 rounded-xl shadow-sm overflow-hidden bg-gray-200 animate-pulse'>
    <div className='w-3/4 p-3'>
      <div className='w-[200px] h-[200px] bg-gray-300 rounded'></div>
    </div>

    <div className='flex flex-col items-center justify-center w-1/4 p-2'>
      <div className='flex items-center'>
        <div className='w-8 h-8 bg-gray-300 rounded-full mx-2' />
        <div className='w-10 h-10 bg-gray-300 rounded-md grid place-content-center' />
        <div className='w-8 h-8 bg-gray-300 rounded-full mx-2' />
      </div>
      <div className='w-2/4 h-8 bg-gray-300 rounded my-4'></div>
    </div>
  </div>
)

export default CartItemSkeleton
