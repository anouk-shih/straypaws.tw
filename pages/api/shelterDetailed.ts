import { NextApiRequest, NextApiResponse } from "next";

import { getCachedData, setCachedData } from "@/lib/cache";
import { getShelterAPI } from "@/utils/url/shelter";

const CACHE_KEY = "shelterDetailed";
const DATA_URL = getShelterAPI("detailed");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShelterDetailed[] | null | { error: string }>
) {
  console.log("Fetching shelter detailed data...");

  try {
    let data = await getCachedData<ShelterDetailed[]>(CACHE_KEY);

    if (!data) {
      console.log("Cache miss. Fetching fresh data...");
      const response = await fetch(DATA_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
      await setCachedData(CACHE_KEY, data);
    } else {
      console.log("Serving data from cache");
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching shelter detailed data:", error);
    res.status(500).json({ error: "Error fetching shelter detailed data" });
  }
}
