<template>
  <div class="peoples">
    <Suspense>
      <PeopleList />
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import PeopleList from "../components/PeopleList.vue";
</script>
