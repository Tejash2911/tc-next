import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import Rating from './Rating'
import SingleReview from './SingleReview'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import { setError } from '@/redux/slices/errorSlice'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '@/lib/axios'

export default function Review({ productID, productName, ratingCount, rating, setModal }) {
  const user = useAppSelector(state => state.user.currentUser)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [reviews, setReviews] = useState()

  useEffect(() => {
    if (!productID) return
    ;(async () => {
      try {
        const { data } = await axiosInstance.get(`/review/${productID}`, { cache: 'no-store' })
        setReviews(data)
      } catch (error) {
        console.log(error)
        dispatch(setError(error.response.data.message))
      }
    })()
  }, [productID, dispatch])

  const handleWriteReview = () => {
    if (!user) router.push('/login')
    setModal(true)
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
        {reviews?.map(r => {
          return <SingleReview review={r} key={r._id}></SingleReview>
        })}
      </div>
    </div>
  )
}
