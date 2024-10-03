import { userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const getByUserId = id => {
  return new Promise((resolve, reject) => {
    userRequest
      .get(`/order/find/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const orderService = {
  getByUserId
}

export default orderService
