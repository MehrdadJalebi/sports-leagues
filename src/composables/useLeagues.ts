import { useQuery } from "@tanstack/vue-query";
import { fetchAllLeagues, type AllLeaguesResponse } from "../api/leagues.api";
import type { League } from "../types/league.types";

export function useLeagues() {
  return useQuery({
    queryKey: ["leagues"],
    queryFn: ({ signal }) => fetchAllLeagues(signal),
    staleTime: 1000 * 60 * 5,
    select: (data: AllLeaguesResponse) => data.leagues as League[],
  });
}
