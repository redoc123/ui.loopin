/// <reference types="vite/client" />

/** Declare the type of the vite environment variable (if not declared, the default is any) */
declare interface ImportMetaEnv {
  readonly VITE_BASE_API: string
  readonly VITE_ROUTER_HISTORY: "hash" | "html5"
  readonly VITE_PUBLIC_PATH: string
}
