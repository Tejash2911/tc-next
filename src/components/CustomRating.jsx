import { useState } from 'react'
import { Icon } from '@iconify/react'

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
                  <Icon icon='ri:star-fill' width={24} height={24} className='text-yellow-500' />
                ) : (
                  <Icon icon='ri:star-line' width={24} height={24} className='text-gray-300' />
                )}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
