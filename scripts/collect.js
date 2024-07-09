import glob from "fast-glob"
import { writeFile } from "fs/promises"
import { resolve } from "path"

const pkgDir = resolve(import.meta.dirname, "../packages/composables-core")
const libFile = resolve(pkgDir, "lib/index.ts")
await writeFile(libFile, "")
const modules = await glob(
  ["./*/lib/index.ts", "!./composables-core/lib/index.ts"],
  {
    cwd: resolve(pkgDir, "../"),
  }
)

const fileContent = []
for (const module of modules) {
  fileContent.push(`export * from '${"../../" + module}'`)
}
await writeFile(libFile, fileContent.join("\n"))
