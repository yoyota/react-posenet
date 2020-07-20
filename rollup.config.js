import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import external from "rollup-plugin-peer-deps-external"
import { terser } from "rollup-plugin-terser"
import packageJSON from "./package.json"

const input = "./src/index.js"

export default [
  {
    input,
    output: [
      {
        exports: "named",
        name: packageJSON.name,
        file: packageJSON.browser,
        format: "umd",
        globals: {
          react: "React"
        }
      },
      {
        exports: "named",
        name: packageJSON.name,
        file: packageJSON.module,
        format: "es",
        globals: {
          react: "React"
        }
      }
    ],
    external: ["react", "react-dom"],
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      terser()
    ]
  }
]
