import { customRef, Ref } from "vue"

/**
 * Provides a throttled function.
 * @param fn The function to throttle.
 * @param delay The zero or greater delay in milliseconds. The default is 200.
 * @returns The throttled function.
 */
function useThrottledFn<T, A extends any[]>(
  fn: (this: T, ...args: A) => any,
  delay: number = 200
): (this: T, ...args: A) => void {
  let startTime = Date.now()
  return function throttled(this: T, ...args: A) {
    if (Date.now() - startTime >= delay) {
      fn.apply(this, args)
      startTime = Date.now()
    }
  }
}

/**
 * Provides a throttled ref.
 * @param initalValue The initial value.
 * @param delay The zero or greater delay in milliseconds. The default is 200.
 * @returns The throttled ref.
 */
function useThrottledRef<T>(initalValue: T, delay: number = 200): Ref<T> {
  let startTime = Date.now()
  let value = initalValue
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        if (Date.now() - startTime >= delay) {
          value = newValue
          trigger()
          startTime = Date.now()
        }
      },
    }
  })
}

export { useThrottledFn, useThrottledRef }
