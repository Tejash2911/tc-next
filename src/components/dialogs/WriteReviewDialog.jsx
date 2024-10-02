import { useState } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Modal from '../Modal'
import { setError } from '@/redux/slices/errorSlice'
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
          dispatch(setError(res.data.message))
          handle.handleClose()
          setRating(0)
          setReview('')
        })
        .catch(error => {
          dispatch(setError(error.data.message))
        })
    },
    handleClose: () => {
      setOpen(false)
    }
  }

  return (
    <Modal open={open}>
      <div className='flex flex-col items-center gap-5 font-Urbanist'>
        <h1>{data.product?.title}</h1>
        <div className='flex justify-start items-center gap-2 w-full'>
          <Image src='/user.png' alt='user-image' width={50} height={50} />
          <span className='text-xl'>{currentUser?.firstName + ' ' + currentUser?.lastName}</span>
        </div>
        <div className='flex flex-col items-center gap-6 max-h-72'>
          <CustomRating setProductRating={setRating} />
          <textarea
            name='review'
            id='review'
            className='w-96 h-36 border-2 border-teal-600 text-base p-2 rounded-2xl'
            placeholder='Share your thoughts on this product...'
            value={review}
            onChange={e => setReview(e.target.value)}
          ></textarea>
        </div>
        <div className='flex justify-end items-end w-full'>
          <button
            className='m-2 py-2 px-5 rounded-full border border-teal-600 bg-white font-semibold text-teal-600 disabled:bg-[#c0f3f3] disabled:border-[#c0f3f3] disabled:cursor-not-allowed disabled:text-black'
            onClick={handle.handleClose}
          >
            Cancel
          </button>
          <button
            className='m-2 py-2 px-5 rounded-full border border-teal-600 bg-teal-600 font-semibold text-white disabled:bg-[#c0f3f3] disabled:border-[#c0f3f3] disabled:cursor-not-allowed disabled:text-black'
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
