<script setup lang="ts">
import { computed } from "vue";
import { useLeagues } from "./composables/useLeagues";
import { useLeagueFilters } from "./composables/useLeagueFilters";
import FiltersBar from "./components/FiltersBar.vue";
import MainHeader from "./components/MainHeader.vue";
import LeagueList from "./components/LeagueList.vue";

const { data, isLoading, isError } = useLeagues();
const { searchTerm, sportFilter, debouncedSearch } = useLeagueFilters();

const sports = computed(() => {
  if (!data.value) return [];
  return [...new Set(data.value.map((l) => l.strSport))].sort();
});

const filteredLeagues = computed(() => {
  if (!data.value) return [];

  return data.value.filter((league) => {
    const matchesSearch = league.strLeague
      .toLowerCase()
      .includes(debouncedSearch.value.toLowerCase());

    const matchesSport =
      !sportFilter.value || league.strSport === sportFilter.value;

    return matchesSearch && matchesSport;
  });
});
</script>

<template>
  <div>
    <MainHeader />

    <main class="container">
      <h1>Sports Leagues</h1>

      <FiltersBar
        :sports="sports"
        :search="searchTerm"
        :sport="sportFilter"
        @searchChange="searchTerm = $event"
        @sportChange="sportFilter = $event"
      />

      <p v-if="isError" class="error-message">
        Something went wrong while loading leagues. Please try again.
      </p>

      <LeagueList v-else :loading="isLoading" :leagues="filteredLeagues" />
    </main>
  </div>
</template>

<style scoped>
.container {
  width: 90vw;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 10px 20px;
}

.error-message {
  padding: 16px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background: #fef2f2;
  color: #991b1b;
}
</style>
