<template>
  <div class="peoples-ыштпду">
    <Suspense>
      <PeopleSingle />
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import PeopleSingle from "../components/PeopleSingle.vue";
</script>
