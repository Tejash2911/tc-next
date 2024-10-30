import Image from 'next/image'
import Link from 'next/link'

export default function CategoryItem({ item }) {
  return (
    <div className='w-[150px] md:w-[180px] xl:w-[220px] font-Urbanist relative overflow-hidden flex justify-center items-center shadow-md transition duration-300 ease-in-out hover:shadow-lg'>
      <Image src={item.img} alt={item.title} width={1260} height={750} className='img' />
      <div className='absolute inset-0 flex justify-center items-center flex-col gap-5 w-full h-full transition duration-300 ease-in-out hover:bg-opacity-20 hover:bg-black hover:backdrop-blur-sm'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-lg sm:text-xl font-semibold text-white'>{item.title}</h1>
          <Link
            href={`/products/${item.cat}`}
            className='px-3 py-1 text-xs sm:text-sm bg-gray-200 border-none shadow-sm rounded-xl transition duration-300 ease-in-out'
          >
            Browse
          </Link>
        </div>
      </div>
    </div>
  )
}
