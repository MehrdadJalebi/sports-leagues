<script setup lang="ts">
import { ref } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import type { League } from "../types/league.types";
import { fetchSeasonBadge, type SeasonBadgeResponse } from "../api/seasons.api";
import BadgeModal from "./BadgeModal.vue";

const props = defineProps<{
  league: League;
}>();

const showModal = ref(false);
const loading = ref(false);
const badgeUrl = ref<string | null>(null);
const badgeError = ref(false);

const queryClient = useQueryClient();

async function openModal() {
  showModal.value = true;
  badgeError.value = false;

  const cacheKey = ["seasonBadge", props.league.idLeague];

  const cached = queryClient.getQueryData<SeasonBadgeResponse>(cacheKey);

  if (cached) {
    badgeUrl.value = cached.seasons?.[0]?.strBadge || null;
    return;
  }

  try {
    loading.value = true;

    const data = (await fetchSeasonBadge(
      props.league.idLeague,
    )) as SeasonBadgeResponse;

    queryClient.setQueryData(cacheKey, data);
    badgeUrl.value = data.seasons?.[0]?.strBadge || null;
  } catch {
    badgeError.value = true;
    badgeUrl.value = null;
  } finally {
    loading.value = false;
  }
}

function closeModal() {
  showModal.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openModal();
  }
}
</script>

<template>
  <div>
    <div
      class="card"
      role="button"
      tabindex="0"
      :aria-label="`Open badge modal for ${league.strLeague}`"
      @click="openModal"
      @keydown="onKeydown"
    >
      <h3>{{ league.strLeague }}</h3>

      <p class="sport">{{ league.strSport }}</p>

      <p v-if="league.strLeagueAlternate" class="alt">
        {{ league.strLeagueAlternate }}
      </p>
    </div>

    <BadgeModal :show="showModal" :title="league.strLeague" @close="closeModal">
      <div v-if="loading" class="modal-state">Loading badge...</div>

      <div v-else-if="badgeUrl">
        <img
          :src="badgeUrl"
          :alt="`${league.strLeague} season badge`"
          class="badge"
        />
      </div>

      <div v-else-if="badgeError" class="modal-state">
        Could not load badge for this league.
      </div>

      <div v-else class="modal-state">No badge available for this league.</div>
    </BadgeModal>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  min-height: 150px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.card:focus-visible {
  outline: 2px solid #111827;
  outline-offset: 2px;
}

h3 {
  margin: 0 0 12px;
  font-size: 1.05rem;
}

.sport {
  margin: 0 0 8px;
  font-weight: 600;
}

.alt {
  margin: 0;
  color: #6b7280;
}

.badge {
  width: 120px;
  margin: 12px auto;
}

.modal-state {
  margin-top: 12px;
  color: #6b7280;
}
</style>
