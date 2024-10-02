import { userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const getCartSize = () => {
  return new Promise((resolve, reject) => {
    userRequest
      .get('/cart/size')
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getCartInfoByUserId = id => {
  return new Promise((resolve, reject) => {
    userRequest
      .get(`/cart/info/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const cartService = {
  getCartSize,
  getCartInfoByUserId
}

export default cartService
