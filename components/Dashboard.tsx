// components/Dashboard.tsx
import React from "react";

import { useShelterDetailed, useShelterSummary } from "@/hooks/useOpenAPI";

const Dashboard: React.FC = () => {
  const { data: summaryData, error: summaryError } = useShelterSummary();
  const { data: detailData, error: detailError } = useShelterDetailed();

  if (summaryError || detailError) return <div>Failed to load data</div>;
  if (!summaryData || !detailData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Stray Animal Dashboard</h1>
      <ul>
        {summaryData.map((shelter) => (
          <li key={shelter.ID}>
            {shelter.rpt_country}: {shelter.adopt_num} adoptions
          </li>
        ))}
      </ul>
      <ul>
        {detailData.map((shelter) => (
          <li key={shelter.ID}>
            {shelter.rpt_country}: {shelter.fe_sum_num} adoptions
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
