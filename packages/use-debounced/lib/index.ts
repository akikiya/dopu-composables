import { customRef, type Ref } from "vue"

/**
 * Provides a debounced function.
 * @param fn The function to debounce.
 * @param delay The zero or greater delay in milliseconds. The default is 200.
 * @returns The debounced function.
 */
function useDebouncedFn<T, A extends any[]>(
  fn: (this: T, ...args: A) => any,
  delay: number = 200
): (this: T, ...args: A) => void {
  if (typeof fn !== "function" || typeof delay !== "number") {
    throw new TypeError(
      "useDebouncedFn: fn and delay must be a function and a number"
    )
  }
  let timeout: number
  return function debounced(this: T, ...args: A) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * Provides a debounced ref.
 * @param initalValue The initial value.
 * @param delay The zero or greater delay in milliseconds. The default is 200.
 * @returns The debounced ref.
 */
function useDebouncedRef<T>(initalValue: T, delay: number = 200): Ref<T> {
  return customRef((track, trigger) => {
    let value = initalValue
    let timeout: number
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

export { useDebouncedFn, useDebouncedRef }
