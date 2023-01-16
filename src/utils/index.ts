import dayjs from "dayjs"

/** format time */
export const formatDateTime = (time: string | number | Date) => {
  if (!time) {
    return "N/A"
  }
  const date = new Date(time)
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

/** Import global CSS variables for use in JS */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ""
  try {
    // When no value is obtained, an empty string will be returned
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}
