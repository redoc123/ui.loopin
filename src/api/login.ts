import { request } from "@/utils/service"

export interface ILoginData {
  email: string
  password: string
}

/** Get login verification code */
export function getLoginCodeApi() {
  return request({
    url: "login/code",
    method: "get"
  })
}
/** Login and return Token */
export function loginApi(data: ILoginData) {
  return request({
    url: "users/login",
    method: "post",
    data
  })
}
/** Get user details */
export function getUserInfoApi() {
  return request({
    url: "users/info",
    method: "get"
  })
}
