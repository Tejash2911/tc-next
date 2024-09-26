import { axiosInstance } from '@/lib/axios/axiosInstance'
import { handleApiErr, handleApiRes } from './handleApi'

const getAll = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/announcements/all')
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getById = id => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/announcements/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const add = payload => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/announcements', payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const updateById = ORpayload => {
  const { id, payload } = ORpayload
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`/announcements/${id}`, payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const deleteById = id => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/announcements/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const announcementService = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
}

export default announcementService
