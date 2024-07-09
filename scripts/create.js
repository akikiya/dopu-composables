import { createInterface } from "node:readline/promises"
import process from "node:process"
import { resolve } from "node:path"
import { mkdir, writeFile } from "node:fs/promises"

const readline = createInterface(process.stdin, process.stdout)
readline
  .question("The new composable is: ")
  .then(async name => {
    name = name.trim()
    const dir = resolve(import.meta.dirname, "../packages", name)
    await mkdir(dir, { recursive: true })
    // dir/package.json
    await writeFile(
      resolve(dir, "package.json"),
      `{
  "name": "@dopu/${name}",
  "description": "A Vue3 composable function.",
  "version": "0.1.0",
  "type": "module",
  "files": [
    "dist"
  ],
  "main": "./dist/${name}.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    "types": "./dist/types/index.d.ts",
    "import": "./dist/${name}.js",
    "require": "./dist/${name}.cjs"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build && tsc",
    "publish": "pnpm build && pnpm publish --access public --registry https://registry.npmjs.org/ --no-git-checks"
  },
  "dependencies": {
    "vue": "^3.4.31"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.5",
    "typescript": "^5.4.5",
    "vite": "^5.2.10"
  }
}
`
    )
    // dir/tsconfig.json
    await writeFile(
      resolve(dir, "tsconfig.json"),
      `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "declarationDir": "dist/types"
  },
  "include": ["lib", "lib/index.ts"]
}
`
    )
    // dir/vite-env.d.ts
    await writeFile(
      resolve(dir, "vite-env.d.ts"),
      `/// <reference types="vite/client" />
`
    )
    // dir/vite.config.ts
    await writeFile(
      resolve(dir, "vite.config.ts"),
      `import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "./lib/index.ts",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue"],
    },
  },
})
`
    )
    // dir/index.html
    await writeFile(
      resolve(dir, "index.html"),
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue3 Composable</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`
    )
    // dir/lib/
    await mkdir(resolve(dir, "lib"), { recursive: true })
    // dir/lib/index.ts
    await writeFile(resolve(dir, "lib/index.ts"), ``)
    // dir/src/
    await mkdir(resolve(dir, "src"), { recursive: true })
    // dir/src/main.ts
    await writeFile(
      resolve(dir, "src/main.ts"),
      `import { createApp } from "vue"
import App from "./App.vue"

createApp(App).mount("#app")
`
    )
    // dir/src/App.vue
    await writeFile(
      resolve(dir, "src/App.vue"),
      `<script setup lang="ts"></script>

<template></template>
`
    )
  })
  .then(() => {
    process.exit(0)
  })
