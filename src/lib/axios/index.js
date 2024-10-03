import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

function getAccessToken() {
  try {
    if (typeof window !== 'undefined') {
      const storage = JSON.parse(localStorage.getItem('user'))

      return storage ? storage.accessToken : null
    }
  } catch (error) {
    console.error('Error retrieving access token:', error)
  }
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL
})

export const userRequest = axios.create({
  baseURL: BASE_URL
})

userRequest.interceptors.request.use(config => {
  try {
    const newToken = getAccessToken()

    if (newToken) {
      config.headers.token = `${newToken}`
    }
  } catch (error) {
    console.error('Error updating request with new token:', error)
  }

  return config
})
