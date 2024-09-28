import { axiosInstance } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const get = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/announcement')
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const announcementService = {
  get
}

export default announcementService
