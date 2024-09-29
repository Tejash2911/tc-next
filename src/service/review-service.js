import { axiosInstance, userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const getAllReviewByProductId = id => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/review/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const add = ORpayload => {
  return new Promise((resolve, reject) => {
    const { id, payload } = ORpayload

    userRequest
      .post(`/review/${id}`, payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const reviewService = {
  getAllReviewByProductId,
  add
}

export default reviewService
