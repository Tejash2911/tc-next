import Image from 'next/image'
import itemNf from '../../public/itemNF.png'

export default function ProductNotFound(props) {
  return (
    <div className='flex flex-col items-center justify-center font-Urbanist'>
      <Image src={itemNf} alt='not-found' width={1348} height={900} className='w-1/4' />
      <h3 className='my-2 text-center text-3xl'>{props.title}</h3>
      <span className='text-center text-lg font-light'>{props.desc}</span>
      <span className='text-center text-lg font-light'>Please Try Again</span>
    </div>
  )
}
