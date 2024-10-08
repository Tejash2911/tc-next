import { axiosInstance, userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const getAll = id => {
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

const upvote = id => {
  return new Promise((resolve, reject) => {
    userRequest
      .put(`/review/upvote/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const abuse = id => {
  return new Promise((resolve, reject) => {
    userRequest
      .put(`/review/abuse/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const reviewService = {
  getAll,
  add,
  upvote,
  abuse
}

export default reviewService
