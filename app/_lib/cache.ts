import fs from "fs";
import path from "path";

const CACHE_DIR = path.join(process.cwd(), "cache");

const TIME_MONTHLY = 30 * 24 * 60 * 60 * 1000;

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export async function getCachedData<T>(key: string, maxAge = TIME_MONTHLY): Promise<T | null> {
  console.log("Fetching cached data...");

  const filePath = path.join(CACHE_DIR, `${key}.json`);

  if (fs.existsSync(filePath)) {
    const cacheContent = fs.readFileSync(filePath, "utf8");
    const { data, timestamp }: CacheItem<T> = JSON.parse(cacheContent);

    if (Date.now() - timestamp < maxAge) {
      return data;
    }
  }

  return null;
}

export async function setCachedData<T>(key: string, data: T): Promise<void> {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
  }

  const filePath = path.join(CACHE_DIR, `${key}.json`);
  const cacheContent: CacheItem<T> = {
    data,
    timestamp: Date.now(),
  };

  fs.writeFileSync(filePath, JSON.stringify(cacheContent));
}
