import { Icon } from '@iconify/react'

export default function Rating({ value }) {
  return (
    <div className='flex'>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1

        return (
          <span key={index} className='text-xs sm:text-sm'>
            {ratingValue <= value ? (
              <Icon icon='ri:star-fill' className='text-yellow-500' />
            ) : (
              <Icon icon='ri:star-line' className='text-gray-300' />
            )}
          </span>
        )
      })}
    </div>
  )
}
