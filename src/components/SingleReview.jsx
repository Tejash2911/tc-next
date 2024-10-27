import Image from 'next/image'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import Rating from './Rating'
import timeSince from '@/utils/timeSince'
import { useAppDispatch } from '@/redux/hooks'
import { errorActions } from '@/redux/slices/errorSlice'
import { abuseReview, upvoteReview } from '@/redux/slices/reviewSlice'

export default function SingleReview({ review }) {
  const dispatch = useAppDispatch()

  const handle = {
    handleUpVote: () => {
      dispatch(upvoteReview(review._id))
        .unwrap()
        .then(res => dispatch(errorActions.setErrorMessage(res?.message)))
        .catch(error => dispatch(errorActions.setErrorMessage(error?.message)))
    },
    handleReport: () => {
      dispatch(abuseReview(review._id))
        .unwrap()
        .then(res => dispatch(errorActions.setErrorMessage(res?.message)))
        .catch(error => dispatch(errorActions.setErrorMessage(error?.message)))
    }
  }

  return (
    <div className='flex gap-5 font-Urbanist'>
      <div className='h-fit'>
        <Image src='/user.png' alt='profile-image' width={40} height={40} />
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <p className='text-lg'>{`${review?.user?.firstName} ${review?.user?.lastName}`}</p>
        <div className='flex items-center gap-2'>
          <Rating value={review?.rating} />
          <span className='text-sm'>{timeSince(review?.createdAt)}</span>
        </div>
        <p className='text-sm'>{review?.review}</p>
        <div className='flex items-center justify-between text-sm'>
          <div className='flex items-center gap-1 cursor-pointer hover:text-blue-600' onClick={handle.handleUpVote}>
            <ThumbUpOffAltIcon style={{ fontSize: '18px' }} /> Helpful?
          </div>
          <div onClick={handle.handleReport} className='text-red-600 cursor-pointer hover:underline'>
            Report as inappropriate
          </div>
        </div>
      </div>
    </div>
  )
}
