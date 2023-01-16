import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite"
import path, { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import svgLoader from "vite-svg-loader"
import UnoCSS from "unocss/vite"

/** Configuration item document: https://cn.vitejs.dev/config */
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    /** Modify the base according to the actual situation when packaging */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** The @ symbol points to the src directory */
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      /** Whether to enable HTTPS */
      https: false,
      /** Set host: true to use the form of Network to access the project by IP */
      host: true, // host: "0.0.0.0"
      /** The port number */
      port: 3333,
      /** Whether to automatically open the browser */
      open: false,
      /** Cross domain settings allowed */
      cors: true,
      /** When the port is occupied, whether to exit directly */
      strictPort: false,
      /** interface proxy */
      proxy: {
        "/api/v1": {
          target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212/api/v1",
          ws: true,
          /** Whether to allow cross-domain */
          changeOrigin: true,
          rewrite: (path) => path.replace("/api/v1", "")
        }
      }
    },
    build: {
      /** Eliminate warnings for pack size exceeding 500kb */
      chunkSizeWarningLimit: 2000,
      /** Vite 2.6.x and above need to configure minify: "terser", terserOptions to take effect */
      minify: "terser",
      /** Remove console.log, debugger and comments when packaging code */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ["console.log"]
        },
        format: {
          /** Remove comments */
          comments: false
        }
      },
      /** Packaged static resource directory */
      assetsDir: "static"
    },
    /** Vite plugin */
    plugins: [
      vue(),
      vueJsx(),
      /** Convert SVG static image to Vue component */
      svgLoader(),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      /** UnoCSS */
      UnoCSS()
      /** Automatic on-demand import (changed to full import, so commented) */
      // AutoImport({
      //   dts: "./types/auto-imports.d.ts",
      // /** Automatically import Element Plus related functions on demand, such as ElMessage */
      //   resolvers: [ElementPlusResolver()],
      // /** Generate the .eslintrc-auto-import.json file for Eslint to recognize according to the relevant APIs automatically imported on demand */
      //   eslintrc: {
      // enabled: true, // default false
      // filepath: "./types/.eslintrc-auto-import.json", // default "./.eslintrc-auto-import.json"
      //     globalsPropValue: true // 默认 true (true | false | "readonly" | "readable" | "writable" | "writeable")
      //   }
      // }),
      // Components({
      //   dts: "./types/components.d.ts",
      // /** Automatically import Element Plus components on demand */
      //   resolvers: [ElementPlusResolver()]
      // })
    ]
  }
}
