<script setup lang="ts">
import type { League } from "../types/league.types";
import LeagueCard from "./LeagueCard.vue";
import LeagueSkeleton from "./LeagueSkeleton.vue";
import EmptyState from "./EmptyState.vue";

defineProps<{
  leagues?: League[];
  loading?: boolean;
}>();
</script>

<template>
  <div v-if="loading" class="grid" aria-label="Loading leagues">
    <LeagueSkeleton v-for="i in 8" :key="i" />
  </div>

  <EmptyState
    v-else-if="!leagues || leagues.length === 0"
    message="No leagues match your filters."
  />

  <div v-else class="grid">
    <LeagueCard
      v-for="league in leagues"
      :key="league.idLeague"
      :league="league"
    />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
