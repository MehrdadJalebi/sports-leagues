<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="logo-wrapper" aria-label="Go to homepage">
      <img src="@/assets/sporty.svg" alt="SportyTV logo" class="logo" />
    </RouterLink>
  </header>
</template>

<style scoped>
.header {
  background-color: #ff3c4f;
  color: #ffffff;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
}

.logo-wrapper {
  display: inline-flex;
  align-items: center;
  padding: 0 10px;
}

.logo {
  width: 92px;
  height: 20px;
}
</style>
