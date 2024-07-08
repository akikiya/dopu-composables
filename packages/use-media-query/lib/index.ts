import { onScopeDispose, ref, Ref } from "vue"

/**
 * Provides a reactive match state for the given media query.
 * @param query The query string to match.
 * @param initalState The initial state to use. The default is `false`.
 * @returns A ref of the current match state.
 */
function useMediaQuery(
  query: string,
  initalState: boolean = false
): Ref<boolean> {
  const matches = ref(!!initalState)
  if (typeof matchMedia === "function") {
    const mql = matchMedia(query)
    function handler(mql: MediaQueryList | MediaQueryListEvent) {
      matches.value = mql.matches
    }
    handler(mql)
    mql.addEventListener("change", handler)
    onScopeDispose(() => {
      mql.removeEventListener("change", handler)
    })
  }
  return matches
}

export { useMediaQuery }
