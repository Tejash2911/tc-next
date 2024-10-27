import Image from 'next/image'
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'
import ReviewIcon from '@mui/icons-material/RateReview'

export default function ProductItem(props) {
  const { img, title, _id, desc, price, ratingsAverage, ratingsQuantity } = props.data

  return (
    <Link href={`/product/${_id}`}>
      <div className='w-[160px] sm:w-44 md:w-48 xl:w-52 h-fit overflow-hidden transition-all duration-300 shadow-md bg-opacity-30 bg-gray-100 rounded-md p-1 hover:shadow-xl'>
        <div className='flex items-center justify-center overflow-hidden p-10 h-28 md:h-32'>
          <Image
            src={img}
            alt={title}
            width={128}
            height={128}
            className='transition-all duration-300 hover:scale-90'
          />
        </div>
        <div className='flex flex-col p-2 gap-1'>
          <h2 className='text-sm text-gray-700 overflow-ellipsis overflow-hidden whitespace-nowrap'>{title}</h2>
          <p className='text-xs text-gray-500 overflow-ellipsis overflow-hidden whitespace-nowrap'>
            {desc ? desc : 'No Description'}
          </p>
          <div className='flex justify-between  bg-teal-200 rounded px-1 shadow-sm'>
            <span className='text-gray-700 text-xs sm:text-sm'>Rs. {price}</span>
            <div className=' flex items-center rounded-md text-gray-700 text-xs gap-1'>
              <div className='flex items-center'>
                {ratingsAverage} <StarIcon className='text-[#ff9800] text-sm' />
              </div>
              <div className='flex items-center gap-1'>
                {ratingsQuantity} <ReviewIcon className='text-[#ffd700] text-xs' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
