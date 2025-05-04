import Image from 'next/image'
import Link from 'next/link'

export default function CategoryItem({ item }) {
  return (
    <div className='relative flex w-[150px] items-center justify-center overflow-hidden font-Urbanist shadow-md transition duration-300 ease-in-out hover:shadow-lg md:w-[180px] xl:w-[220px]'>
      <Image src={item.img} alt={item.title} width={1260} height={750} className='img' />
      <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-5 transition duration-300 ease-in-out hover:bg-black hover:bg-opacity-20 hover:backdrop-blur-sm'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-lg font-semibold text-white sm:text-xl'>{item.title}</h1>
          <Link
            href={`/products/${item.cat}`}
            className='rounded-xl border-none bg-gray-200 px-3 py-1 text-xs shadow-sm transition duration-300 ease-in-out sm:text-sm'
          >
            Browse
          </Link>
        </div>
      </div>
    </div>
  )
}
