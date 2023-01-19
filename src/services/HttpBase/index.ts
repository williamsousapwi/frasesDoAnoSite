import axios from 'axios'

const HttpBase = axios.create({
  baseURL: 'https://localhost:5001/api/'
})

export default HttpBase
