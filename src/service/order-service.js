import { userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const getByUserId = async id => {
  try {
    const res = await userRequest.get(`/order/find/${id}`)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const orderService = {
  getByUserId
}

export default orderService
