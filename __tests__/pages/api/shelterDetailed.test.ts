// import { NextApiRequest, NextApiResponse } from "next";
// import { createMocks } from "node-mocks-http";
// import { describe, expect, it, vi } from "vitest";

// import handler from "@/app/api/shelterDetailed";
// import { getCachedData, setCachedData } from "@/lib/cache";

// const mockData: ShelterDetailed[] = [
//   {
//     ID: 1,
//     rpt_year: 112,
//     rpt_country_code: "City000003",
//     rpt_country: "新北市",
//     rpt_month: 10,
//     max_stay_dog_num: 50,
//     max_stay_cat_num: 30,
//     fs_gg_num: 20,
//     fs_ms_num: 10,
//     fs_sum_num: 30,
//     in_gg_num: 5,
//     in_ms_num: 3,
//     in_lv_num: 2,
//     in_bk_num: 1,
//     in_re_num: 4,
//     in_lw_num: 0,
//     in_els_num: 0,
//     in_tot_num: 15,
//     out_tback_num: 2,
//     out_ad_ca_num: 5,
//     out_ad_fa_num: 3,
//     out_ad_cv_num: 4,
//     out_hs_3_num: 1,
//     out_hs_5_num: 2,
//     out_hs_7_num: 3,
//     out_hs_ot_num: 0,
//     out_sd_num: 2,
//     out_jd_num: 1,
//     out_rl_num: 3,
//     out_ec_num: 0,
//     out_el_num: 0,
//     out_tot_num: 6,
//     fe_gg_num: 15,
//     fe_ms_num: 5,
//     fe_sum_num: 20,
//     end_dog_max_percent: "60%",
//     end_cat_max_percent: "40%",
//   },
// ];

// vi.mock("../../../lib/cache");

// describe("/api/shelterDetailed", () => {
//   it("should return cached data if available", async () => {
//     vi.mocked(getCachedData).mockResolvedValue(mockData);

//     const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
//       method: "GET",
//     });

//     await handler(req, res);

//     expect(res._getStatusCode()).toBe(200);
//     expect(JSON.parse(res._getData())).toEqual(mockData);
//   });

//   it("should fetch and cache new data if cache is empty", async () => {
//     vi.mocked(getCachedData).mockResolvedValue(null);
//     global.fetch = vi.fn().mockResolvedValue({
//       ok: true,
//       json: () => Promise.resolve(mockData),
//     });

//     const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
//       method: "GET",
//     });

//     await handler(req, res);

//     expect(res._getStatusCode()).toBe(200);
//     expect(JSON.parse(res._getData())).toEqual(mockData);
//     expect(setCachedData).toHaveBeenCalledWith("shelterDetailed", mockData);
//   });

//   it("should handle errors", async () => {
//     vi.mocked(getCachedData).mockRejectedValue(new Error("Cache error"));

//     const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
//       method: "GET",
//     });

//     await handler(req, res);

//     expect(res._getStatusCode()).toBe(500);
//     expect(JSON.parse(res._getData())).toEqual({ error: "Error fetching shelter detailed data" });
//   });
// });
