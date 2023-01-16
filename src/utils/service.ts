import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { useUserStoreHook } from "@/store/modules/user"
import { ElMessage } from "element-plus"
import { get } from "lodash-es"
import { getToken } from "./cache/cookies"

/** Create request instance */
function createService() {
  // Create an Axios instance
  const service = axios.create()
  // request interception
  service.interceptors.request.use(
    (config) => config,
    // Failed to send
    (error) => Promise.reject(error)
  )
  // Response interception (can be adjusted according to specific business)
  service.interceptors.response.use(
    (response) => {
      // apiData is the data returned by the API
      const apiData = response.data as any
      // This code is the business code agreed with the backend
      const code = apiData.code
      // If there is no Code, it means that this is not an API developed by the project's backend
      if (code === undefined) {
        ElMessage.error("non-system interface")
        return Promise.reject(new Error("non-system interface"))
      } else {
        switch (code) {
          case 0:
            // code === 0 Represents no errors
            return apiData
          default:
            // is not the correct Code
            ElMessage.error(apiData.message || "Error")
            return Promise.reject(new Error("Error"))
        }
      }
    },
    (error) => {
      // Status is the HTTP status code
      const status = get(error, "response.status")
      switch (status) {
        case 400:
          error.message = "wrong request"
          break
        case 401:
          // When the Token expires, directly log out and force refresh the page (redirect to the login page)
          useUserStoreHook().logout()
          location.reload()
          break
        case 403:
          error.message = "access denied"
          break
        case 404:
          error.message = "Request address error"
          break
        case 408:
          error.message = "Request timed out"
          break
        case 500:
          error.message = "internal server error"
          break
        case 501:
          error.message = "service not implemented"
          break
        case 502:
          error.message = "gateway error"
          break
        case 503:
          error.message = "service is not available"
          break
        case 504:
          error.message = "gateway timeout"
          break
        case 505:
          error.message = "HTTP version not supported"
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** Create request method */
function createRequestFunction(service: AxiosInstance) {
  return function (config: AxiosRequestConfig) {
    const configDefault = {
      headers: {
        // 携带 Token
        Authorization: "Bearer " + getToken(),
        "Content-Type": get(config, "headers.Content-Type", "application/json")
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}

/** Example for network request */
export const service = createService()
/** Methods for network requests */
export const request = createRequestFunction(service)
