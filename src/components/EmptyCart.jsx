import Image from 'next/image'
import Link from 'next/link'

export default function EmptyCart() {
  return (
    <div className='my-5 flex flex-col items-center justify-center gap-2 font-Urbanist'>
      <Image src='/cart.svg' alt='not-found' width={900} height={600} priority className='w-1/5' />
      <h3 className='text-center text-3xl font-semibold'>Your cart is empty</h3>
      <span className='text-center text-lg font-light'>Looks like you haven&apos;t added anything to cart yet</span>
      <Link href='/home'>
        <button className='w-[150px] border border-teal-700 bg-white p-2 text-xs transition-all duration-300 hover:bg-teal-700 hover:text-white sm:text-sm'>
          Go Home
        </button>
      </Link>
    </div>
  )
}
