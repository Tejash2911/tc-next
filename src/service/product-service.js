import { handleApiErr, handleApiRes } from './handleApi'
import { axiosInstance } from '@/lib/axios'

const getSearchProducts = payload => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/product/search/${payload}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getById = id => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/product/info/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const productService = {
  getById,
  getSearchProducts
}

export default productService
