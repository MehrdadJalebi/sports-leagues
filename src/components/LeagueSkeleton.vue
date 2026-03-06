<template>
  <div class="skeleton-card" aria-hidden="true">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-sport"></div>
    <div class="skeleton skeleton-alt"></div>
  </div>
</template>

<style scoped>
.skeleton-card {
  min-height: 150px;
  border-radius: 12px;
  padding: 16px;
  background: white;
  border: 1px solid #e5e7eb;
}

.skeleton {
  border-radius: 6px;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: loading 1.2s infinite linear;
}

.skeleton-title {
  height: 22px;
  width: 70%;
  margin-bottom: 14px;
}

.skeleton-sport {
  height: 18px;
  width: 35%;
  margin-bottom: 12px;
}

.skeleton-alt {
  height: 16px;
  width: 85%;
}

@keyframes loading {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
</style>
