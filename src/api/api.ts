import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'

// 目前只有这两种请求
interface API {
  instance: AxiosInstance
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  only: (request: (...params: any[]) => Promise<any>, handle?: (result: Promise<any>) => Promise<any>) => (...params: any[]) => Promise<any>
}

const cancelMap = new WeakMap<Promise<any>, () => void>()
const prevMap = new Map<(...params: any[]) => Promise<any>, Promise<any>>()
const { protocol, host } = window.location
const baseURL: string = process.env.NODE_ENV === 'production'
  ? (process.env.REACT_APP_API_HOST || `${protocol}//${host}`)
  : `${protocol}//${process.env.WDS_SOCKET_HOST}:${process.env.WDS_SOCKET_PORT}/api`

const api = axios.create({
  baseURL,
  timeout: 0,
  withCredentials: true
})

const exportApi: API = {
  instance: api,
  get: (url, config = {}) => resultHandle(config, () => api.get(url, config)),
  post: (url, data, config = {}) => resultHandle(config, () => api.post(url, data, config)),
  only: (request, handle) => (...params) => {
    const result = request(...params)
    const prevResult = prevMap.get(request)
    const cancel = cancelMap.get(prevResult!)

    cancel && cancel()
    prevMap.set(request, result)
    return handle ? handle(result) : result
  }
}

export default exportApi

function resultHandle(config: AxiosRequestConfig, operate: () => Promise<any>) {
  const source = axios.CancelToken.source()

  config.cancelToken = source.token

  const result = operate().then(resolveHandle).catch(rejectHandle)

  const cancel = () => {
    source.cancel()
    cancelMap.delete(result)
  }

  cancelMap.set(result, cancel)
  result.finally(cancel)

  return result
}

function resolveHandle(res: AxiosResponse<any>) {
  const { data, code, msg } = res.data

  // 44 为未登录
  if(code - 0 === 44)
    window.location.href = data.url

  // 不等于 0 为系统错误
  if(code !== 0)
    return Promise.reject(new Error(msg))

  return data
}

function rejectHandle(err: Error | string[]) {
  if (err instanceof Error) {
    message.error(err.message || '网络错误!')
    return Promise.reject([err.message])
  }

  return Promise.reject(err as string[])
}