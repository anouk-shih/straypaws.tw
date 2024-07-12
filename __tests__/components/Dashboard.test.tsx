import { describe, expect, it, vi } from "vitest";

import Dashboard from "@/components/Dashboard";
import { useShelterSummary } from "@/hooks/useOpenAPI";
import { render, screen } from "@testing-library/react";

vi.mock("../../hooks/useOpenAPI");

describe("Dashboard", () => {
  it("renders loading state", () => {
    vi.mocked(useShelterSummary).mockReturnValue({
      data: undefined,
      error: undefined,
    } as any);

    render(<Dashboard />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useShelterSummary).mockReturnValue({
      data: undefined,
      error: new Error("Failed to fetch"),
    } as any);

    render(<Dashboard />);
    expect(screen.getByText("Failed to load data")).toBeInTheDocument();
  });

  it("renders shelter summary data", () => {
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
    vi.mocked(useShelterSummary).mockReturnValue({
      data: mockData,
      error: undefined,
    } as any);

    render(<Dashboard />);
    expect(screen.getByText("Stray Animal Dashboard")).toBeInTheDocument();
    // Add more specific assertions based on how you render your data
  });
});
