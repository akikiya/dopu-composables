<script setup lang="ts">
import { useStorage } from "../lib"

const data = useStorage(sessionStorage, "data", { k: 1 })
</script>

<template>
  <pre>{{ data }}</pre>
  <input v-model="data.k" />
</template>
