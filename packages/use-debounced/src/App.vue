<script setup lang="ts">
import { useDebouncedFn, useDebouncedRef } from "../lib"

const text = useDebouncedRef("Hi", 500)
const count = useDebouncedRef(0, 0)
const onClick = useDebouncedFn(() => {
  count.value++
}, 500)
</script>

<template>
  <div>
    <p>{{ text }}</p>
    <input v-model="text" />
    <hr />
    <p>{{ count }}</p>
    <button @click="onClick">Debounced</button>
  </div>
</template>
