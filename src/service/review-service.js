import { axiosInstance, userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const getAll = async id => {
  try {
    const res = await axiosInstance.get(`/review/${id}`)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const add = async ORpayload => {
  try {
    const { id, payload } = ORpayload
    const res = await userRequest.post(`/review/${id}`, payload)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const upvote = async id => {
  try {
    const res = await userRequest.put(`/review/upvote/${id}`)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const abuse = async id => {
  try {
    const res = await userRequest.put(`/review/abuse/${id}`)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const reviewService = {
  getAll,
  add,
  upvote,
  abuse
}

export default reviewService
