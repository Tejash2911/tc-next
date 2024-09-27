import axios from 'axios'

const BASE_URL = 'https://tc-api-4sbm.onrender.com/api/v1'

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
  baseURL: BASE_URL,
  headers: { token: `Bearer ${getAccessToken()}` }
})

userRequest.interceptors.request.use(config => {
  try {
    const newToken = getAccessToken()
    if (newToken) {
      config.headers.token = `Bearer ${newToken}`
    }
  } catch (error) {
    console.error('Error updating request with new token:', error)
  }
  return config
})
