<template>
  <div class="favorites">
    <Suspense>
      <FavoritesList />
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import FavoritesList from "../components/FavoritesList.vue";
</script>
