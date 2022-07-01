import axios from 'axios'

const token = localStorage.getItem('dashboard:token')

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
}
)