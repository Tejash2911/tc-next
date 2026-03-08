import { userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const getCartSize = async () => {
  try {
    const res = await userRequest.get('/cart/size')

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const getById = async id => {
  try {
    const res = await userRequest.get(`/cart/info/${id}`)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const add = async payload => {
  try {
    const res = await userRequest.post('/cart', payload)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const updateCartQtyById = async payload => {
  try {
    const { id, qty } = payload
    const res = await userRequest.put(`/cart/update-quantity/${id}/${qty}`)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const deleteById = async id => {
  try {
    const res = await userRequest.delete(`/cart/${id}`)

    return handleApiRes(res)
  } catch (error) {
    throw handleApiErr(error)
  }
}

const cartService = {
  getCartSize,
  getById,
  add,
  updateCartQtyById,
  deleteById
}

export default cartService
