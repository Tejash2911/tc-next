import Image from 'next/image'
import Link from 'next/link'
import { hero } from '@/utils/dummyData'

export default function Slider() {
  const index = Math.floor(Math.random() * 8) + 1
  const heroInfo = hero[index]

  return (
    <section className='container'>
      <div className='max-h-[65vh] w-full overflow-hidden'>
        <Image src='/slider.jpg' alt='banner' width={999} height={667} priority className='img' />
      </div>
      <div className='my-5 flex flex-col items-center justify-center gap-3'>
        <h1 className='font-AlfaSlabOne text-2xl font-bold sm:text-4xl'>{heroInfo.title}</h1>
        <span className='font-Urbanist text-sm font-medium sm:text-base'>{heroInfo.description}</span>
        <Link href='/products/all'>
          <button className='cursor-pointer rounded-full bg-black px-10 py-2 font-Urbanist text-xs text-white sm:text-sm'>
            {heroInfo.cta}
          </button>
        </Link>
      </div>
    </section>
  )
}
