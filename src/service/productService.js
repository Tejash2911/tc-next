import { axiosInstance } from '@/lib/axios/axiosInstance'
import { handleApiErr, handleApiRes } from './handleApi'

const getAll = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/products/all')
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getById = id => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/products/info/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const add = payload => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/products', payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const updateById = ORpayload => {
  const { id, payload } = ORpayload
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`/products/${id}`, payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const deleteById = id => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/products/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const productService = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
}

export default productService
