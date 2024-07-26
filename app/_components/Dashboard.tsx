import React from "react";

import { DataInfo } from "@/types/class";
import { combineShelterDataMonthly } from "@/utils/shelterFn";

import { fetchShelterAPI } from "../_lib/fetchShelterAPI";
import DashboardLayout from "./DashboardLayout";
import KeyMetrics from "./KeyMetrics";
import TaiwanMap from "./TaiwanMap";

const Dashboard: React.FC = async () => {
  const summaryData = await fetchShelterAPI<ShelterSummary>("summary");
  const detailedData = await fetchShelterAPI<ShelterDetailed>("detailed");
  const shelterInfoData = await fetchShelterAPI<ShelterInfo>("info");

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
    <DashboardLayout>
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
        {/* <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Adoption Trend</h3>
            <div className="h-64 bg-gray-200 mt-4"></div>
          </div>
        </div> */}
      </div>

      {/* Recent Activity */}
      {/* <div className="mt-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <ul className="mt-4 space-y-4">
              <li className="bg-gray-50 p-4 rounded-md">Activity 1</li>
              <li className="bg-gray-50 p-4 rounded-md">Activity 2</li>
              <li className="bg-gray-50 p-4 rounded-md">Activity 3</li>
            </ul>
          </div>
        </div>
      </div> */}
    </DashboardLayout>
  );
};

export default Dashboard;
