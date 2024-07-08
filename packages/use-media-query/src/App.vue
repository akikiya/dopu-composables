<script setup lang="ts">
import { useMediaQuery } from "../lib"

const isDark = useMediaQuery("(prefers-color-scheme: dark)")
</script>

<template>
  <p>isDark: {{ isDark }}</p>
</template>
