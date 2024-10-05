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

const getById = id => {
  return new Promise((resolve, reject) => {
    userRequest
      .get(`/cart/info/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const add = payload => {
  return new Promise((resolve, reject) => {
    userRequest
      .post('/cart', payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const updateCartQtyById = payload => {
  return new Promise((resolve, reject) => {
    const { id, qty } = payload

    userRequest
      .put(`/cart/update-quantity/${id}/${qty}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const deleteById = id => {
  return new Promise((resolve, reject) => {
    userRequest
      .delete(`/cart/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(error => reject(handleApiErr(error)))
  })
}

const cartService = {
  getCartSize,
  getById,
  add,
  updateCartQtyById,
  deleteById
}

export default cartService
