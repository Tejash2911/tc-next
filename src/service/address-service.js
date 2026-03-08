import { userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const getUserAddress = async () => {
  try {
    const res = await userRequest.get('/address')

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const setUserAddress = async payload => {
  try {
    const res = await userRequest.post('/address', payload)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const addressService = {
  getUserAddress,
  setUserAddress
}

export default addressService
