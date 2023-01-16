import { ElLoading, LoadingOptions } from "element-plus"

const defaultOption = {
  lock: true,
  text: "Loading...",
  background: "rgba(0, 0, 0, 0.7)"
}

interface ILoading {
  close: () => void
}

/**
 * Pass in a method fn, add "full screen" loading in its execution cycle
 * if:
 * 1. fn is a synchronous method, hide loading after the end
 * 2. If it is an asynchronous method, hide loading after resolve
 * 3. Hide loading and throw an error after reporting an error
 * @param {*} fn function
 * @param options
 * @returns Function A new function, go execute it
 */
export const useFullscreenLoading = <T>(
  fn: (...args: any[]) => T,
  options: LoadingOptions = {}
): ((...args: any[]) => Promise<T>) => {
  let loading: ILoading | undefined
  const showLoading = (options: LoadingOptions) => {
    loading = ElLoading.service(options)
  }

  const hideLoading = () => {
    loading && loading.close()
  }
  const _options = { ...defaultOption, ...options }
  const newFn = (...args: any[]) => {
    try {
      showLoading(_options)
      const result = fn(...args)
      const isPromise = result instanceof Promise
      if (!isPromise) {
        hideLoading()
        return Promise.resolve(result)
      }
      return result
        .then((res: any) => {
          hideLoading()
          return res
        })
        .catch((err: Error) => {
          hideLoading()
          throw err
        })
    } catch (err) {
      hideLoading()
      throw err
    }
  }
  return newFn
}
