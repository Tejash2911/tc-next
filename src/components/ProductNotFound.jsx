import Image from 'next/image'

export default function ProductNotFound(props) {
  return (
    <div className='flex flex-col justify-center items-center font-Urbanist'>
      <Image src='/itemNf.png' alt='not-found' width={1348} height={900} className='w-1/4' />
      <h3 className='text-3xl my-2 text-center'>{props.title}</h3>
      <span className='text-xl font-light text-center'>{props.desc}</span>
      <span className='text-xl font-light text-center'>Please Try Again</span>
    </div>
  )
}
