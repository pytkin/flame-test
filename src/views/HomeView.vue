<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/peoples">Персонажи</RouterLink>
      <RouterLink to="/favorites">Избранное</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
}

nav a.router-link-exact-active,
nav a.router-link-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
