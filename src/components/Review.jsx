import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import Rating from './Rating'
import SingleReview from './SingleReview'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAllReviewByProductId } from '@/redux/slices/reviewSlice'
import useModal from '@/hooks/use-modal'
import WriteReviewDialog from './dialogs/WriteReviewDialog'

export default function Review({ product }) {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(({ user }) => user)
  const { reviews } = useAppSelector(({ review }) => review)

  const reviewDialog = useModal()

  const router = useRouter()

  useEffect(() => {
    if (!product._id) return
    handle.getData()
  }, [product?._id])

  const handleWriteReview = () => {
    if (!currentUser) router.push('/login')
    reviewDialog.onOpen({ product })
  }

  const handle = {
    getData: () => {
      dispatch(getAllReviewByProductId(product?._id))
    }
  }

  return (
    <>
      <div className='p-7'>
        <div className='mb-2 font-Urbanist'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>{product?.title}</h2>
            <button
              className='flex items-center p-2 border border-teal-600 shadow-lg transition-all duration-300 hover:bg-teal-700 hover:text-white'
              onClick={handleWriteReview}
            >
              <DriveFileRenameOutlineIcon /> Write a Review
            </button>
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-2xl'>{product?.ratingsAverage}</span>
            <Rating value={Math.round(product?.ratingsAverage)} />
            {product?.ratingsQuantity} Reviews
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
      {reviewDialog.isOpen && (
        <WriteReviewDialog open={reviewDialog.isOpen} setOpen={reviewDialog.onClose} data={reviewDialog.selectedRow} />
      )}
    </>
  )
}
