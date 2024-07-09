<script setup lang="ts">
import { ref } from "vue"
import { useDebouncedFn, useDebouncedRef } from "../lib"

const text = ref("Hello World")
const updateText = useDebouncedFn((event: Event) => {
  text.value = (event.target as HTMLInputElement).value
}, 500)
const count = useDebouncedRef(0, 250)
const cancelCount = () => count.block()
</script>

<template>
  <div>
    <section>
      <h1>useDebouncedFn</h1>
      <p>Text: {{ text }}</p>
      <button @click="updateText.cancel()">Cancel updates</button>
      <input type="text" :value="text" @input="updateText" />
    </section>
    <section>
      <h1>useDebouncedRef</h1>
      <p>Vaild count: {{ count }}</p>
      <button @click="count++">Increment</button>
      <button @click="cancelCount">Block updates</button>
    </section>
  </div>
</template>
