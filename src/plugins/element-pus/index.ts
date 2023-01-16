import { type App } from "vue"
import ElementPlus from "element-plus"

export function loadElementPlus(app: App) {
  /** Complete introduction of Element Plus components */
  app.use(ElementPlus)
}
