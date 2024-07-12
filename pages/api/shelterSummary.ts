import { NextApiRequest, NextApiResponse } from "next";

import { getShelterAPI } from "@/utils/url/shelter";

import { getCachedData, setCachedData } from "../../lib/cache";

const CACHE_KEY = "shelterSummary";
const DATA_URL = getShelterAPI("summary");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShelterSummary[] | null | { error: string }>
) {
  console.log("Fetching shelter summary data...");

  try {
    let data = await getCachedData<ShelterSummary[]>(CACHE_KEY);

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
    console.error("Error fetching shelter summary data:", error);
    res.status(500).json({ error: "Error fetching shelter summary data" });
  }
}
