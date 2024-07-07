<script setup lang="ts">
import { useMounted } from "../lib"

const isMounted = useMounted()
setInterval(() => {
  console.log(isMounted.value)
}, 1000)
</script>

<template>
  <div>
    {{ isMounted }}
  </div>
</template>
