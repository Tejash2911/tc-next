import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import Rating from './Rating'
import SingleReview from './SingleReview'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAllReviewByProductId } from '@/redux/slices/reviewSlice'

export default function Review({ productID, productName, ratingCount, rating, setModal }) {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(({ user }) => user)
  const { reviews } = useAppSelector(({ review }) => review)

  const router = useRouter()

  useEffect(() => {
    if (!productID) return
    handle.getData()
  }, [productID])

  const handleWriteReview = () => {
    if (!currentUser) router.push('/login')
    setModal(true)
  }

  const handle = {
    getData: () => {
      dispatch(getAllReviewByProductId(productID))
    }
  }

  return (
    <div className='p-7'>
      <div className='mb-2 font-Urbanist'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold'>{productName}</h2>
          <button
            className='flex items-center p-2 border border-teal-600 shadow-lg transition-all duration-300 hover:bg-teal-700 hover:text-white'
            onClick={handleWriteReview}
          >
            <DriveFileRenameOutlineIcon /> Write a Review
          </button>
        </div>
        <div className='flex items-center gap-1'>
          <span className='text-2xl'>{rating}</span>
          <Rating value={Math.round(rating)} />
          {ratingCount} Reviews
        </div>
      </div>
      <hr />
      <div className='flex flex-col gap-5 mt-2'>
        {Array.isArray(reviews) &&
          reviews.map(r => {
            return <SingleReview review={r} key={r._id}></SingleReview>
          })}
      </div>
    </div>
  )
}
