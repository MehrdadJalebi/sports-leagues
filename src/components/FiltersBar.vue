<script setup lang="ts">
const props = defineProps<{
  sports: string[];
  search: string;
  sport: string;
}>();

const emit = defineEmits<{
  (e: "searchChange", value: string): void;
  (e: "sportChange", value: string): void;
}>();
</script>

<template>
  <div class="filters" aria-label="League filters">
    <div class="field">
      <label for="league-search" class="visually-hidden">Search leagues</label>
      <input
        id="league-search"
        :value="search"
        type="text"
        placeholder="Search leagues..."
        class="search"
        @input="emit('searchChange', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <div class="field">
      <label for="sport-filter" class="visually-hidden">Filter by sport</label>
      <select
        id="sport-filter"
        :value="sport"
        class="select"
        @change="
          emit('sportChange', ($event.target as HTMLSelectElement).value)
        "
      >
        <option value="">All Sports</option>
        <option v-for="sport in props.sports" :key="sport" :value="sport">
          {{ sport }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.field {
  display: flex;
  flex: 1;
}

.search {
  flex: 1;
  min-width: 240px;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s ease;
  background-color: #f9fafb;
  color: #1f2937;
}

.search:focus,
.select:focus {
  outline: 2px solid #111827;
  outline-offset: 2px;
  border-color: #9ca3af;
  background-color: #ffffff;
}

.search:hover,
.select:hover {
  border-color: #d1d5db;
}

.search::placeholder {
  color: #9ca3af;
}

.select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  background-color: #f9fafb;
  color: #1f2937;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 160px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  border: 0;
}
</style>
