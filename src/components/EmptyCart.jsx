import Image from 'next/image'
import Link from 'next/link'

export default function EmptyCart() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 font-Urbanist my-5'>
      <Image src='/cart.svg' alt='not-found' width={900} height={600} priority className='w-1/5' />
      <h3 className='text-3xl font-semibold text-center'>Your cart is empty</h3>
      <span className='text-lg font-light text-center'>Looks like you haven&apos;t added anything to cart yet</span>
      <Link href='/'>
        <button className='p-2 w-[150px] text-sm  border border-teal-700 bg-white transition-all duration-300 hover:bg-teal-700 hover:text-white'>
          Go Home
        </button>
      </Link>
    </div>
  )
}
