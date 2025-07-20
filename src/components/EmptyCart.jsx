import Image from 'next/image'
import Link from 'next/link'

export default function EmptyCart() {
  return (
    <div className='flex min-h-[30vh] flex-col items-center justify-center p-4 font-Urbanist sm:px-6 lg:px-8'>
      <div className='w-full max-w-xs'>
        <Image src='/cart.svg' alt='Empty cart' width={900} height={600} className='w-full' priority />
      </div>
      <h3 className='mb-2 mt-4 text-center text-lg font-semibold sm:text-xl'>Your cart is empty</h3>
      <p className='text-center text-sm text-gray-600 sm:text-base'>
        Looks like you haven&apos;t added anything to cart yet
      </p>
      <Link href='/home' className='mt-4'>
        <button className='w-40 rounded border border-teal-700 bg-white p-2 text-xs transition-all duration-300 hover:bg-teal-700 hover:text-white sm:w-48 sm:text-sm'>
          Go Home
        </button>
      </Link>
    </div>
  )
}
