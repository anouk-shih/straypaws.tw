// components/Dashboard.tsx
import React from "react";

// import StrayChart from "./StrayChart";
// import StrayMap from "./StrayMap";
import { useShelterSummary } from "@/hooks/useOpenAPI";

const Dashboard: React.FC = () => {
  const { data, error } = useShelterSummary();

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Stray Animal Dashboard</h1>
      <ul>
        {data.map((shelter) => (
          <li key={shelter.ID}>
            {shelter.rpt_country}: {shelter.adopt_num} adoptions
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
