import axios, { AxiosRequestConfig } from 'axios'
// import * as Storage from 'local-storage'
import { get as GetLocalStorage } from 'local-storage'

const requestSuccess = async (config: AxiosRequestConfig) => {
  const idUsuarioLogado = await GetLocalStorage('usuario-logado')
  if (idUsuarioLogado) config.headers.IdUsuarioLogado = String(idUsuarioLogado)

  return config
}

const HttpBase = axios.create({
  baseURL: 'https://localhost:5001/api/'
})

HttpBase.interceptors.request.use(requestSuccess)

export default HttpBase
