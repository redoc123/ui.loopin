import { ref } from "vue"
import { getActiveThemeName, setActiveThemeName } from "@/utils/cache/localStorage"

interface IThemeList {
  title: string
  name: ThemeName
}

/** Registered topic name, where normal is required */
export type ThemeName = "normal" | "dark" | "dark-blue"

/** subject list */
const themeList: IThemeList[] = [
  {
    title: "default",
    name: "normal"
  },
  {
    title: "dark",
    name: "dark"
  },
  {
    title: "dark blue",
    name: "dark-blue"
  }
]

/** The name of the theme being applied */
const activeThemeName = ref<ThemeName>(getActiveThemeName() || "normal")

const initTheme = () => {
  setHtmlClassName(activeThemeName.value)
}

const setTheme = (value: ThemeName) => {
  activeThemeName.value = value
  setHtmlClassName(activeThemeName.value)
  setActiveThemeName(activeThemeName.value)
}

/** Mount the class on the html root element */
const setHtmlClassName = (value: ThemeName) => {
  document.documentElement.className = value
}

/** theme hook */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
