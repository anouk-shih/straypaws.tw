// lib/fetchServerSideData.ts
import "server-only";

import { cache } from "react";

import { getShelterRoute } from "@/utils/url/shelter";

import { getCachedData, setCachedData } from "./cache";

const API_ROUTE = {
  detailed: "shelter/api/detailed",
  summary: "shelter/api/summary",
  info: "shelter/api/info",
};

export const fetchShelterAPI = cache(async <T>(name: "detailed" | "summary" | "info"): Promise<T[]> => {
  const CACHE_KEY = name;
  const DATA_URL = getShelterRoute(name);

  try {
    let data = await getCachedData<T[]>(CACHE_KEY);

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

    return data || [];
  } catch (error) {
    console.error(`Error fetching shelter ${name} data:`, error);
    throw new Error(`Error fetching shelter ${name} data`);
  }
});
