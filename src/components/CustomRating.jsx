import { useState } from 'react'
import { Star, StarBorder } from '@mui/icons-material'

export default function CustomRating({ setProductRating }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(null)

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex'>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1

          return (
            <label key={index}>
              <input
                type='radio'
                name='rating'
                value={ratingValue}
                onClick={() => {
                  setRating(ratingValue)
                  setProductRating(ratingValue)
                }}
                className='hidden'
              />
              <span onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)}>
                {ratingValue <= (hover || rating) ? (
                  <Star className='text-yellow-500 text-3xl cursor-pointer' />
                ) : (
                  <StarBorder className='text-gray-300 text-3xl cursor-pointer' />
                )}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
