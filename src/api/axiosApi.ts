// src/api.js
import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'https://ophim1.com/v1/api'
})

axiosApi.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosApi.interceptors.response.use(
  ({ data }) => {
    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosApi
