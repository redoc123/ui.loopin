import { request } from "@/utils/service"

interface ICreateTableDataApi {
  username: string
  password: string
}

interface IUpdateTableDataApi {
  id: string
  username: string
  password?: string
}

interface IGetTableDataApi {
  /** current page number */
  currentPage: number
  /** Search number */
  size: number
  /** Search parameters */
  username?: string
  phone?: string
}

/** increase */
export function createTableDataApi(data: ICreateTableDataApi) {
  return request({
    url: "table",
    method: "post",
    data
  })
}

/** delete */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: "delete"
  })
}

/** modify */
export function updateTableDataApi(data: IUpdateTableDataApi) {
  return request({
    url: "table",
    method: "put",
    data
  })
}

/** read */
export function getTableDataApi(params: IGetTableDataApi) {
  return request({
    url: "table",
    method: "get",
    params
  })
}
