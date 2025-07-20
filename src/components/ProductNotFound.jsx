import Image from 'next/image'
import itemNf from '../../public/itemNF.png'

export default function ProductNotFound(props) {
  return (
    <div className='flex min-h-[30vh] flex-col items-center justify-center py-4 font-Urbanist'>
      <div className='w-full max-w-xs'>
        <Image src={itemNf} alt='not-found' width={1348} height={900} className='w-full' priority />
      </div>
      <h3 className='mb-2 mt-4 text-center text-lg font-semibold sm:text-xl'>{props.title}</h3>
      <p className='text-center text-sm text-gray-600 sm:text-base'>{props.desc}</p>
      <p className='mt-1 text-center text-sm text-gray-600 sm:text-base'>Please Try Again</p>
    </div>
  )
}
