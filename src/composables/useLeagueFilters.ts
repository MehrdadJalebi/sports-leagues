import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { refDebounced, useDebounceFn } from "@vueuse/core";

export function useLeagueFilters() {
  const route = useRoute();
  const router = useRouter();

  const searchTerm = ref("");
  const sportFilter = ref("");
  const initialized = ref(false);

  const debouncedSearch = refDebounced(searchTerm, 300);

  watch(
    () => route.query,
    (query) => {
      searchTerm.value = (query.search as string) || "";
      sportFilter.value = (query.sport as string) || "";
      initialized.value = true;
    },
    { immediate: true },
  );

  const updateUrl = useDebounceFn(() => {
    if (!initialized.value) return;

    const newQuery = {
      search: searchTerm.value || undefined,
      sport: sportFilter.value || undefined,
    };

    if (
      route.query.search !== newQuery.search ||
      route.query.sport !== newQuery.sport
    ) {
      router.replace({ query: newQuery });
    }
  }, 300);

  watch([searchTerm, sportFilter], updateUrl);

  return {
    searchTerm,
    sportFilter,
    debouncedSearch,
  };
}
