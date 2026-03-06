<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{
  show: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const closeButtonRef = ref<HTMLButtonElement | null>(null);

function handleEsc(e: KeyboardEvent) {
  if (e.key === "Escape" && props.show) {
    emit("close");
  }
}

watch(
  () => props.show,
  async (isOpen) => {
    if (isOpen) {
      await nextTick();
      closeButtonRef.value?.focus();
    }
  },
);

onMounted(() => {
  window.addEventListener("keydown", handleEsc);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEsc);
});
</script>

<template>
  <div v-if="show" class="overlay" @click.self="emit('close')">
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-modal-title"
    >
      <button
        ref="closeButtonRef"
        class="close"
        type="button"
        aria-label="Close modal"
        @click="emit('close')"
      >
        ✕
      </button>

      <h2 id="badge-modal-title" class="title">{{ title }}</h2>

      <slot />
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  position: relative;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}

.title {
  margin: 0 0 12px;
  font-size: 1.25rem;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  padding: 6px;
}

.close:focus-visible {
  outline: 2px solid #111827;
  outline-offset: 2px;
}
</style>
