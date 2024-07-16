import React from "react";

import { fetchShelterDetailed, fetchShelterSummary } from "@/lib/fetchServerSideData";
import { DataInfo } from "@/types/class";

import Layout from "../Layout";
import KeyMetrics from "./KeyMetrics";

const Dashboard: React.FC = async () => {
  const summaryData = await fetchShelterSummary();
  const detailedData = await fetchShelterDetailed();

  if (!summaryData || !detailedData) {
    return <div>Loading...</div>;
  }

  const summaryInfo = new DataInfo<ShelterSummary>(summaryData);
  const detailedInfo = new DataInfo<ShelterDetailed>(detailedData);

  return (
    <Layout>
      {/* Key Metrics */}
      <KeyMetrics summaryInfo={summaryInfo} detailedInfo={detailedInfo} />
      {/* Map and Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Taiwan Map</h3>
            {/* Add your map component here */}
            <div className="h-64 bg-gray-200 mt-4"></div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Adoption Trend</h3>
            {/* Add your chart component here */}
            <div className="h-64 bg-gray-200 mt-4"></div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            {/* Add your activity feed component here */}
            <ul className="mt-4 space-y-4">
              <li className="bg-gray-50 p-4 rounded-md">Activity 1</li>
              <li className="bg-gray-50 p-4 rounded-md">Activity 2</li>
              <li className="bg-gray-50 p-4 rounded-md">Activity 3</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
