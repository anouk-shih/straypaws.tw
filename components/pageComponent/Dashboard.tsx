import React from "react";

import {
  fetchShelterDetailed, fetchShelterInfo, fetchShelterSummary
} from "@/lib/fetchServerSideData";
import { DataInfo } from "@/types/class";
import { combineShelterDataMonthly } from "@/utils/shelterFn";

import Layout from "../Layout";
import TaiwanMap from "../TaiwanMap";
import KeyMetrics from "./KeyMetrics";

const Dashboard: React.FC = async () => {
  const summaryData = await fetchShelterSummary();
  const detailedData = await fetchShelterDetailed();
  const shelterInfoData = await fetchShelterInfo();

  if (!summaryData || !detailedData || !shelterInfoData) {
    return <div>Loading...</div>;
  }

  const summaryInfo = new DataInfo<ShelterSummary>(summaryData);
  const detailedInfo = new DataInfo<ShelterDetailed>(detailedData);
  const ShelterCombined = combineShelterDataMonthly(
    shelterInfoData,
    summaryData,
    detailedData,
    summaryInfo.getNewestDate()
  );

  return (
    <Layout>
      {/* Key Metrics */}
      <KeyMetrics summaryInfo={summaryInfo} detailedInfo={detailedInfo} />
      {/* Map and Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card ">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-right text-gray-500 text-sm mb-2">點擊縣市顯示更多資訊</p>
            <TaiwanMap data={ShelterCombined} />
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
