import { userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const getUserAddress = () => {
  return new Promise((resolve, reject) => {
    userRequest
      .get('/address')
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const setUserAddress = payload => {
  return new Promise((resolve, reject) => {
    userRequest
      .post('/address', payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const addressService = {
  getUserAddress,
  setUserAddress
}

export default addressService
