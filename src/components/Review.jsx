import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import Rating from './Rating'
import SingleReview from './SingleReview'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAllReviewByProductId } from '@/redux/slices/reviewSlice'
import useModal from '@/hooks/use-modal'
import WriteReviewDialog from './dialogs/WriteReviewDialog'
import SingleReviewSkeleton from './loaders/SingleReviewSkeleton'

export default function Review({ product }) {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(({ user }) => user)
  const { reviews, loading } = useAppSelector(({ review }) => review)

  const reviewDialog = useModal()

  const router = useRouter()

  useEffect(() => {
    if (!product._id) return
    dispatch(getAllReviewByProductId(product._id))
  }, [product._id])

  const handleWriteReview = () => {
    if (!currentUser) router.push('/login')
    reviewDialog.onOpen({ product })
  }

  return (
    <>
      <div className='py-5'>
        <div className='flex flex-col gap-2 font-Urbanist'>
          <div className='flex flex-col justify-between sm:flex-row'>
            <h2 className='text-sm font-semibold'>{product?.title}</h2>
            <button
              className='flex w-fit items-center gap-1 border border-teal-600 p-1 text-xs shadow-lg transition-all duration-300 hover:bg-teal-700 hover:text-white sm:text-sm'
              onClick={handleWriteReview}
            >
              <Icon icon='ri:edit-line' /> Write a Review
            </button>
          </div>
          <div className='flex items-center gap-1 text-xs sm:text-sm'>
            <span>{product?.ratingsAverage}</span>
            <Rating value={Math.round(product?.ratingsAverage)} />
            {product?.ratingsQuantity} Reviews
          </div>
        </div>
        <hr className='my-2' />
        <div className='mt-2 flex flex-col gap-5'>
          {Array.isArray(reviews) && !loading ? (
            reviews.map(r => {
              return <SingleReview review={r} key={r._id}></SingleReview>
            })
          ) : (
            <SingleReviewSkeleton />
          )}
        </div>
      </div>
      {reviewDialog.isOpen && (
        <WriteReviewDialog open={reviewDialog.isOpen} setOpen={reviewDialog.onClose} data={reviewDialog.selectedRow} />
      )}
    </>
  )
}
