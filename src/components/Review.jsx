import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import Rating from './Rating'
import SingleReview from './SingleReview'
import useModal from '@/hooks/use-modal'
import WriteReviewDialog from './dialogs/WriteReviewDialog'
import SingleReviewSkeleton from './loaders/SingleReviewSkeleton'
import { useReviewsByProductId } from '@/hooks/useReviewQueries'
import { useCurrentUser } from '@/hooks/useUserQueries'

export default function Review({ product }) {
  const { data: currentUser } = useCurrentUser()
  const { data: reviews, isPending } = useReviewsByProductId(product._id)

  const reviewDialog = useModal()

  const router = useRouter()

  const handleWriteReview = () => {
    if (!currentUser) router.push('/login')
    reviewDialog.onOpen({ product })
  }

  return (
    <>
      <div className='container py-5'>
        <div className='flex flex-col gap-2'>
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
          {isPending ? (
            <SingleReviewSkeleton />
          ) : Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map(r => <SingleReview review={r} key={r._id} />)
          ) : (
            <div className='flex flex-col items-center justify-center py-4 text-center text-gray-500'>
              <p className='text-sm font-medium sm:text-base'>No reviews yet</p>
              <p className='text-xs sm:text-sm'>Be the first to review this product</p>
            </div>
          )}
        </div>
      </div>
      <WriteReviewDialog open={reviewDialog.isOpen} setOpen={reviewDialog.onClose} data={reviewDialog.selectedRow} />
    </>
  )
}
