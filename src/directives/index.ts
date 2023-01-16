import { type App } from "vue"
import { permission } from "./permission"

/** Mount custom commands */
export function loadDirectives(app: App) {
  app.directive("permission", permission)
}
