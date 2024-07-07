import type { Ref } from "vue"
import { ref, onMounted, onUnmounted } from "vue"

/**
 * Provides a ref to show if the component is mounted.
 */
function useMounted(): Ref<boolean> {
  const mounted = ref(false)
  onMounted(() => {
    mounted.value = true
  })
  onUnmounted(() => {
    mounted.value = false
  })
  return mounted
}

export { useMounted }
