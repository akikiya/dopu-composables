<script setup lang="ts">
import { useMounted } from "../lib"

const isMounted = useMounted()
</script>

<template>
  <div>
    {{ isMounted }}
  </div>
</template>
