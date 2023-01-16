import { reactive } from "vue"

interface IDefaultPaginationData {
  total: number
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
}

interface IPaginationData {
  total?: number
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number
  layout?: string
}

/** Default pagination parameters */
const defaultPaginationData: IDefaultPaginationData = {
  total: 0,
  currentPage: 1,
  pageSizes: [10, 20, 50],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper"
}

export const usePagination = (_paginationData: IPaginationData = {}) => {
  /** Merge pagination parameters */
  const paginationData = reactive(Object.assign({ ...defaultPaginationData }, _paginationData))

  /** Change the current page number */
  const handleCurrentChange = (value: number) => {
    paginationData.currentPage = value
  }

  /** Change page size */
  const handleSizeChange = (value: number) => {
    paginationData.pageSize = value
  }

  return { paginationData, handleCurrentChange, handleSizeChange }
}
