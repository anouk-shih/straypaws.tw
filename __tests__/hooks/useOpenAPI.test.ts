import { describe, expect, it, vi } from "vitest";

import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useShelterSummary } from "../../hooks/useOpenAPI";

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
