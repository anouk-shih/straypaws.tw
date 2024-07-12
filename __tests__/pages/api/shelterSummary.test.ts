import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import { describe, expect, it, vi } from "vitest";

import { getCachedData, setCachedData } from "../../../lib/cache";
import handler from "../../../pages/api/shelterSummary";

vi.mock("../../../lib/cache");

describe("/api/shelterSummary", () => {
  it("should return cached data if available", async () => {
    const mockData = [{ ID: 1, rpt_country: "Taipei", adopt_num: 100 }];
    vi.mocked(getCachedData).mockResolvedValue(mockData);

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockData);
  });

  it("should fetch and cache new data if cache is empty", async () => {
    const mockData: ShelterSummary[] = [
      {
        ID: 1,
        rpt_year: 112,
        rpt_country_code: "City000003",
        rpt_country: "新北市",
        rpt_month: 9,
        accept_num: 10,
        adopt_num: 5,
        adopt_rate: 50,
        adopt_total: 100,
        end_num: 2,
        end_rate: 20,
        dead_num: 1,
        dead_rate: 10,
      },
    ];

    vi.mocked(getCachedData).mockResolvedValue(null);
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockData);
    expect(setCachedData).toHaveBeenCalledWith("shelterSummary", mockData);
  });

  it("should handle errors", async () => {
    vi.mocked(getCachedData).mockRejectedValue(new Error("Cache error"));

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ error: "Error fetching shelter summary data" });
  });
});
