import { axiosInstance, userRequest } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const login = async payload => {
  try {
    const res = await axiosInstance.post('/auth/login', payload)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const register = async payload => {
  try {
    const res = await axiosInstance.post('/auth/register', payload)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const logout = async () => {
  try {
    const res = await axiosInstance.post('/auth/logout')

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const update = async ORpayload => {
  try {
    const { id, payload } = ORpayload
    const res = await userRequest.put(`/user/${id}`, payload)

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const userService = {
  login,
  register,
  logout,
  update
}

export default userService
