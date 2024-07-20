// lib/fetchServerSideData.ts
import "server-only";

import { cache } from "react";

const API_ROUTE = {
  shelterDetailed: "/api/shelterDetailed",
  shelterSummary: "/api/shelterSummary",
  shelterInfo: "/api/shelterInfo",
};

export const fetchShelterSummary = cache(async (): Promise<ShelterSummary[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTE.shelterSummary}`, {
    next: { revalidate: 0 }, // Disable Next.js cache to use our custom cache
  });
  if (!res.ok) throw new Error("Failed to fetch shelter summary");
  return res.json();
});

export const fetchShelterDetailed = cache(async (): Promise<ShelterDetailed[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTE.shelterDetailed}`, {
    next: { revalidate: 0 }, // Disable Next.js cache to use our custom cache
  });
  if (!res.ok) throw new Error("Failed to fetch shelter detailed");
  return res.json();
});

export const fetchShelterInfo = cache(async (): Promise<ShelterInfo[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTE.shelterInfo}`, {
    next: { revalidate: 0 }, // Disable Next.js cache to use our custom cache
  });
  if (!res.ok) throw new Error("Failed to fetch shelter info");
  return res.json();
});
