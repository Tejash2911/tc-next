import { hero } from '@/utils/dummyData'
import Image from 'next/image'
import Link from 'next/link'

export default function Slider() {
  const index = Math.floor(Math.random() * 8) + 1
  const heroInfo = hero[index]

  return (
    <section className='container'>
      <div className='w-full max-h-[65vh] overflow-hidden'>
        <Image src='/slider.jpg' alt='banner' width={999} height={667} priority className='img' />
      </div>
      <div className='flex flex-col justify-center items-center gap-3'>
        <h1 className='text-4xl font-bold font-AlfaSlabOne'>{heroInfo.title}</h1>
        <span className='font-Urbanist font-medium'>{heroInfo.description}</span>
        <Link href='/products/all'>
          <button className='mb-5 font-Urbanist rounded-full bg-black text-white px-10 py-2 cursor-pointer'>
            {heroInfo.cta}
          </button>
        </Link>
      </div>
    </section>
  )
}
