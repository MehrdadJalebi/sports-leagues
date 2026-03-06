<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>

<template>
  <div class="empty">
    <p>{{ message || "No leagues found." }}</p>
  </div>
</template>

<style scoped>
.empty {
  padding: 40px;
  text-align: center;
  color: #777;
  border: 1px dashed #ddd;
  border-radius: 8px;
}
</style>
