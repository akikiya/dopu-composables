import { customRef, Ref } from "vue"

interface DebouncedFn<T, A extends any[]> {
  (this: T, ...args: A): void
  /**
   * Flushes the debounced function regardless of whether it has been cancelled or not.
   */
  flush(this: T, ...args: A): void
  /**
   * Cancels the debounced function.
   */
  cancel(): void
}

/**
 * Provides a debounced function.
 * @param fn The function to debounce.
 * @param delay The zero or greater delay in milliseconds. The default is `200`.
 * @returns The debounced function with `flush` and `cancel` methods.
 *
 * @example
 * ```js
 * const log = useDebouncedFn(console.log, 1000)
 * log(1)
 * log(2)
 * log(3) // logs 3 after 1000ms
 * log.cancel()
 * log(1) // nothing is logged
 * log.flush(1, 2, 3) // logs 1, 2, 3 immediately
 * ```
 */
function useDebouncedFn<T, A extends any[]>(
  fn: (this: T, ...args: A) => any,
  delay: number = 200
): DebouncedFn<T, A> {
  if (typeof fn !== "function" || typeof delay !== "number") {
    throw new TypeError(
      "useDebouncedFn: fn and delay must be a function and a number"
    )
  }
  let timeout: number
  let cancelled = false
  function debounced(this: T, ...args: A) {
    if (cancelled) {
      return
    }
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
  debounced.flush = function (this: T, ...args: A) {
    clearTimeout(timeout)
    fn.apply(this, args)
  }
  debounced.cancel = () => {
    cancelled = true
    clearTimeout(timeout)
  }
  return debounced
}

interface DebouncedRef<T> extends Ref<T> {
  /**
   * Blocks all future updates to the ref.
   */
  block(): void
}

/**
 * Provides a debounced ref.
 * @param initalValue The initial value.
 * @param delay The zero or greater delay in milliseconds. The default is `200`.
 * @returns The debounced ref.
 *
 * @example
 * ```js
 * const debouncedRef = useDebouncedRef(0, 1000)
 * debouncedRef.value = 1
 * debouncedRef.value = 2
 * debouncedRef.value = 3 // updates after 1000ms
 * debouncedRef.block() // nothing will be updated
 * ```
 */
function useDebouncedRef<T>(
  initalValue: T,
  delay: number = 200
): DebouncedRef<T> {
  let value = initalValue
  let timeout: number
  let blocked = false
  const debouncedRef: any = customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        if (blocked) {
          return
        }
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
  debouncedRef.block = () => {
    blocked = true
    clearTimeout(timeout)
  }
  return debouncedRef
}

export { useDebouncedFn, useDebouncedRef }
