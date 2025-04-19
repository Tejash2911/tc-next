import Image from 'next/image'
import Link from 'next/link'
import StarIcon from '@mui/icons-material/Star'
import ReviewIcon from '@mui/icons-material/RateReview'

export default function ProductItem(props) {
  const { img, title, _id, desc, price, ratingsAverage, ratingsQuantity } = props.data

  return (
    <Link href={`/product/${_id}`}>
      <div className='h-fit w-[160px] overflow-hidden rounded-xl bg-gray-100 bg-opacity-30 p-1 shadow-md transition-all duration-300 hover:shadow-xl sm:w-44 md:w-[180px] xl:w-52'>
        <div className='flex h-28 items-center justify-center overflow-hidden p-10 md:h-32'>
          <Image
            src={img}
            alt={title}
            width={128}
            height={128}
            className='transition-all duration-300 hover:scale-90'
          />
        </div>
        <div className='flex flex-col gap-1 p-2'>
          <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-700'>{title}</h2>
          <p className='overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-gray-500'>
            {desc ? desc : 'No Description'}
          </p>
          <div className='flex justify-between rounded-xl bg-teal-200 p-1 shadow-sm'>
            <span className='text-xs text-gray-700'>Rs. {price}</span>
            <div className='flex items-center gap-1 rounded-xl text-xs text-gray-700'>
              <div className='flex items-center'>
                {ratingsAverage} <StarIcon className='text-sm text-[#ff9800]' />
              </div>
              <div className='flex items-center gap-1'>
                {ratingsQuantity} <ReviewIcon className='text-xs text-[#ffd700]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
