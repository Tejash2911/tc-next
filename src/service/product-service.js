import { handleApiErr, handleApiRes } from './handleApi'
import { axiosInstance } from '@/lib/axios'

const getAll = async payload => {
  try {
    const res = await axiosInstance.get('/product/all', { params: payload })

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const getSearchProducts = async payload => {
  try {
    const res = await axiosInstance.get(`/product/search/${payload}`)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const getById = async id => {
  try {
    const res = await axiosInstance.get(`/product/info/${id}`)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const productService = {
  getAll,
  getById,
  getSearchProducts
}

export default productService
