import { Star, StarBorder } from '@mui/icons-material'

export default function Rating({ value }) {
  return (
    <div className='flex'>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1

        return (
          <span key={index}>
            {ratingValue <= value ? (
              <Star className='text-yellow-500' fontSize='small' />
            ) : (
              <StarBorder className='text-gray-300' fontSize='small' />
            )}
          </span>
        )
      })}
    </div>
  )
}
