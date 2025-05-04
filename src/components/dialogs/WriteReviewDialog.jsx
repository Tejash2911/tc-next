import { useState } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Modal from '../Modal'
import { errorActions } from '@/redux/slices/errorSlice'
import CustomRating from '../CustomRating'
import { addReview } from '@/redux/slices/reviewSlice'

export default function WriteReviewDialog({ open, setOpen, data }) {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(({ user }) => user)
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)

  const handle = {
    onSubmit: () => {
      const nPayload = {
        id: data.product._id,
        payload: {
          rating,
          review
        }
      }

      dispatch(addReview(nPayload))
        .unwrap()
        .then(res => {
          dispatch(errorActions.setErrorMessage(res?.message))
          handle.handleClose()
          setRating(0)
          setReview('')
        })
        .catch(error => dispatch(errorActions.setErrorMessage(error?.message)))
    },
    handleClose: () => {
      setOpen(false)
    }
  }

  return (
    <Modal open={open}>
      <div className='flex flex-col items-center gap-5 font-Urbanist'>
        <h1>{data.product?.title}</h1>
        <div className='flex w-full items-center justify-start gap-2'>
          <Image src='/user.png' alt='user-image' width={50} height={50} />
          <span>{currentUser?.firstName + ' ' + currentUser?.lastName}</span>
        </div>
        <div className='flex flex-col items-center gap-6'>
          <CustomRating setProductRating={setRating} />
          <textarea
            name='review'
            id='review'
            className='h-36 w-full rounded-xl border-2 border-teal-600 p-2 text-base sm:w-96'
            placeholder='Share your thoughts on this product...'
            value={review}
            onChange={e => setReview(e.target.value)}
          ></textarea>
        </div>
        <div className='flex w-full items-end justify-end'>
          <button
            className='m-2 rounded-full border border-teal-600 bg-white px-5 py-2 font-semibold text-teal-600 disabled:cursor-not-allowed disabled:border-[#c0f3f3] disabled:bg-[#c0f3f3] disabled:text-black'
            onClick={handle.handleClose}
          >
            Cancel
          </button>
          <button
            className='m-2 rounded-full border border-teal-600 bg-teal-600 px-5 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:border-[#c0f3f3] disabled:bg-[#c0f3f3] disabled:text-black'
            disabled={!review && !rating ? true : false}
            onClick={handle.onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  )
}
