import { API_BASE_URL } from "../config/api";

export type SeasonBadgeResponse = {
  seasons?: Array<{
    strBadge?: string | null;
  }>;
};

export async function fetchSeasonBadge(
  leagueId: string,
  signal?: AbortSignal,
): Promise<SeasonBadgeResponse> {
  const res = await fetch(
    `${API_BASE_URL}/search_all_seasons.php?badge=1&id=${leagueId}`,
    { signal },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch badge");
  }

  return res.json();
}
