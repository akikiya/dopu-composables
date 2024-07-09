import { ref, Ref, watchEffect } from "vue"

function stringify(value: any): string {
  switch (typeof value) {
    case "boolean": {
      return JSON.stringify({ type: "boolean", value })
    }
    case "string": {
      return JSON.stringify({ type: "string", value })
    }
    case "number": {
      return JSON.stringify({ type: "number", value })
    }
    case "bigint": {
      return JSON.stringify({ type: "bigint", value: value.toString() })
    }
    case "symbol": {
      throw new Error("Symbols are not supported")
    }
    case "function": {
      throw new Error("Functions are not supported")
    }
    case "undefined": {
      return JSON.stringify({ type: "undefined" })
    }
    case "object": {
      if (value === null) {
        return JSON.stringify({ type: "null" })
      }
      if (Array.isArray(value)) {
        return JSON.stringify({ type: "array", value: value.map(stringify) })
      }
      if (value instanceof Date) {
        return JSON.stringify({ type: "date", value: value.valueOf() })
      }
      if (value instanceof RegExp) {
        return JSON.stringify({ type: "regexp", value: value.toString() })
      }
      return JSON.stringify({
        type: "object",
        value: Object.fromEntries(
          Object.entries(value).map(([key, value]) => [key, stringify(value)])
        ),
      })
    }
  }
}
function parse(text: string): any {
  const item = JSON.parse(text)
  switch (item.type) {
    case "boolean": {
      return Boolean(item.value)
    }
    case "string": {
      return String(item.value)
    }
    case "number": {
      return Number(item.value)
    }
    case "bigint": {
      return BigInt(item.value)
    }
    case "undefined": {
      return void 0
    }
    case "null": {
      return null
    }
    case "array": {
      return item.value.map(parse)
    }
    case "date": {
      return new Date(item.value)
    }
    case "regexp": {
      return new RegExp(item.value)
    }
    case "object": {
      return Object.fromEntries(
        Object.entries(item.value).map(([key, value]) => [
          key,
          parse(<string>value),
        ])
      )
    }
    default: {
      throw new Error("Unsupported type")
    }
  }
}

function useStorage(
  storage: Storage,
  key: string,
  initalValue: any = null
): Ref {
  const value = ref(initalValue)
  const item = storage.getItem(key)
  value.value = item ? parse(item) : initalValue
  watchEffect(() => {
    storage.setItem(key, stringify(value.value))
  })
  return value
}
const useLocalStorage = (key: string, initalValue: any = null) =>
  useStorage(localStorage, key, initalValue)
const useSessionStorage = (key: string, initalValue: any = null) =>
  useStorage(sessionStorage, key, initalValue)

export { useStorage, useLocalStorage, useSessionStorage }
