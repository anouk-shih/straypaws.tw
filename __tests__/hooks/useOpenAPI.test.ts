import { describe, expect, it, vi } from "vitest";

import { useShelterDetailed, useShelterSummary } from "@/hooks/useOpenAPI";
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

vi.mock("swr");

describe("useShelterSummary", () => {
  it("should return shelter summary data", async () => {
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
    const mockSWR = await import("swr");
    vi.mocked(mockSWR.default).mockReturnValue({
      data: mockData,
      error: undefined,
    } as any);

    const { result } = renderHook(() => useShelterSummary());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    expect(result.current.error).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch");
    const mockSWR = await import("swr");
    vi.mocked(mockSWR.default).mockReturnValue({
      data: undefined,
      error: mockError,
    } as any);

    const { result } = renderHook(() => useShelterSummary());

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
  });
});

describe("useShelterDetailed", () => {
  it("should return shelter detailed data", async () => {
    const mockData: ShelterDetailed[] = [
      {
        ID: 1,
        rpt_year: 112,
        rpt_country_code: "City000003",
        rpt_country: "新北市",
        rpt_month: 10,
        max_stay_dog_num: 50,
        max_stay_cat_num: 30,
        fs_gg_num: 20,
        fs_ms_num: 10,
        fs_sum_num: 30,
        in_gg_num: 5,
        in_ms_num: 3,
        in_lv_num: 2,
        in_bk_num: 1,
        in_re_num: 4,
        in_lw_num: 0,
        in_els_num: 0,
        in_tot_num: 15,
        out_tback_num: 2,
        out_ad_ca_num: 5,
        out_ad_fa_num: 3,
        out_ad_cv_num: 4,
        out_hs_3_num: 1,
        out_hs_5_num: 2,
        out_hs_7_num: 3,
        out_hs_ot_num: 0,
        out_sd_num: 2,
        out_jd_num: 1,
        out_rl_num: 3,
        out_ec_num: 0,
        out_el_num: 0,
        out_tot_num: 6,
        fe_gg_num: 15,
        fe_ms_num: 5,
        fe_sum_num: 20,
        end_dog_max_percent: "60%",
        end_cat_max_percent: "40%",
      },
    ];

    const mockSWR = await import("swr");
    vi.mocked(mockSWR.default).mockReturnValue({
      data: mockData,
      error: undefined,
    } as any);

    const { result } = renderHook(() => useShelterDetailed());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    expect(result.current.error).toBeUndefined();
  });

  it("should handle error state", async () => {
    const mockError = new Error("Failed to fetch");
    const mockSWR = await import("swr");
    vi.mocked(mockSWR.default).mockReturnValue({
      data: undefined,
      error: mockError,
    } as any);

    const { result } = renderHook(() => useShelterDetailed());

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
  });
});
