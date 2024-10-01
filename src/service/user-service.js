import { axiosInstance, userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const login = payload => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/auth/login', payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const register = payload => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/auth/register', payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const update = ORpayload => {
  return new Promise((resolve, reject) => {
    const { id, payload } = ORpayload

    userRequest
      .put(`/user/${id}`, payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const userService = {
  login,
  register,
  update
}

export default userService
