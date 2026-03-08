import Image from 'next/image'
import { Icon } from '@iconify/react'
import Rating from './Rating'
import timeSince from '@/utils/timeSince'
import { useAppDispatch } from '@/redux/hooks'
import { messageActions } from '@/redux/slices/messageSlice'
import { useUpvoteReview, useAbuseReview } from '@/hooks/useReviewQueries'

export default function SingleReview({ review }) {
  const dispatch = useAppDispatch()
  const upvoteMutation = useUpvoteReview()
  const abuseMutation = useAbuseReview()

  const handle = {
    handleUpVote: async () => {
      try {
        const res = await upvoteMutation.mutateAsync(review._id)

        dispatch(messageActions.setMessage(res?.message))
      } catch (error) {
        dispatch(messageActions.setMessage(error?.message))
      }
    },
    handleReport: async () => {
      try {
        const res = await abuseMutation.mutateAsync(review._id)

        dispatch(messageActions.setMessage(res?.message))
      } catch (error) {
        dispatch(messageActions.setMessage(error?.message))
      }
    }
  }

  return (
    <div className='flex gap-5'>
      <div className='h-fit'>
        <Image src='/user.png' alt='profile-image' width={40} height={40} />
      </div>
      <div className='flex w-full flex-col gap-1'>
        <p className='text-sm sm:text-base'>{`${review?.user?.firstName} ${review?.user?.lastName}`}</p>
        <div className='flex items-center gap-2'>
          <Rating value={review?.rating} />
          <span className='text-xs sm:text-sm'>{timeSince(review?.createdAt)}</span>
        </div>
        <p className='text-xs sm:text-sm'>{review?.review}</p>
        <div className='flex items-center justify-between text-xs sm:text-sm'>
          <div className='flex cursor-pointer items-center gap-1 hover:text-blue-600' onClick={handle.handleUpVote}>
            <Icon icon='ri:thumb-up-line' /> Helpful?
          </div>
          <div onClick={handle.handleReport} className='cursor-pointer text-red-600 hover:underline'>
            Report as inappropriate
          </div>
        </div>
      </div>
    </div>
  )
}
