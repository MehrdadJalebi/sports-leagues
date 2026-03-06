import type { League } from "../types/league.types";
import { API_BASE_URL } from "../config/api";

export type AllLeaguesResponse = {
  leagues: League[];
};

export async function fetchAllLeagues(
  signal?: AbortSignal,
): Promise<AllLeaguesResponse> {
  const res = await fetch(`${API_BASE_URL}/all_leagues.php`, {
    signal,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch leagues");
  }

  return res.json();
}
