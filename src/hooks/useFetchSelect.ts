import { onMounted, ref } from "vue"

// Define the data format received by the drop-down box
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  key?: string
}

// Define the input format
interface FetchSelectProps {
  apiFun: () => Promise<any>
}

export function useFetchSelect(props: FetchSelectProps) {
  const { apiFun } = props

  const options = ref<SelectOption[]>([])

  const loading = ref(false)

  const selectedValue = ref("")

  /* Call the interface to request data */
  const loadData = () => {
    loading.value = true
    options.value = []
    return apiFun().then(
      (res) => {
        loading.value = false
        options.value = res.data
        return res.data
      },
      (err) => {
        // Unknown error, may be an error thrown by the code, or a network error
        loading.value = false
        options.value = [
          {
            value: "-1",
            label: err.message,
            disabled: true
          }
        ]
        // then throw an error
        return Promise.reject(err)
      }
    )
  }

  onMounted(() => {
    loadData()
  })

  return {
    options,
    loading,
    selectedValue
  }
}
