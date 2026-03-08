import { axiosInstance } from '@/lib/axios'
import { handleApiErr, handleApiRes } from './handleApi'

const get = async () => {
  try {
    const res = await axiosInstance.get('/announcement')

    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err)
  }
}

const announcementService = {
  get
}

export default announcementService
