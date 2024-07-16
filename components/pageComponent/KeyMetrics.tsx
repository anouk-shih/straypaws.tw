import React from "react";

import { DataInfo } from "@/types/class";

import PureNumber from "../PureNumber";

interface Props {
  summaryInfo: DataInfo<ShelterSummary>;
  detailedInfo: DataInfo<ShelterDetailed>;
}

const KeyMetrics: React.FC<Props> = ({ summaryInfo, detailedInfo }) => {
  const adoptTotal = summaryInfo
    .getNewestDataSet()
    .map((item) => item.adopt_num)
    .reduce((a, b) => a + b, 0);

  const avgAdoptRate = (
    (detailedInfo
      .getNewestDataSet()
      .map((item) => {
        const adopt = item.out_tback_num + item.out_ad_ca_num + item.out_ad_fa_num + item.out_ad_cv_num;
        return Number((adopt / item.fe_sum_num).toFixed(2));
      })
      .reduce((a, b) => Number((a + b).toFixed(2)), 0) /
      detailedInfo.getNewestDataSet().length) *
    100
  ).toFixed(2);

  const inShelterTotal = detailedInfo
    .getNewestDataSet()
    .map((item) => item.fe_sum_num)
    .reduce((a, b) => a + b, 0);

  const avgCapacityRate = (
    detailedInfo
      .getNewestDataSet()
      .map((item) => {
        let dog = item.max_stay_dog_num === 0 ? 0 : Number(item.end_dog_max_percent.replace("%", ""));
        let cat = item.max_stay_cat_num === 0 ? 0 : Number(item.end_cat_max_percent.replace("%", ""));
        return !!dog && !!cat ? (dog + cat) / 2 : dog || cat;
      })
      .reduce((a, b) => a + b, 0) / detailedInfo.getNewestDataSet().length
  ).toFixed(2);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Key Metrics */}
      <PureNumber
        keyName="adopt_num"
        number={adoptTotal}
        info={`全國公立收容所 ${summaryInfo.getNewestDateFormat()}`}
        title={"總領養數"}
      />
      <PureNumber
        keyName="adopt_rate"
        number={`${avgAdoptRate}%`}
        info={`全國公立收容所 ${detailedInfo.getNewestDateFormat()}`}
        title={"平均領養率"}
      />
      <PureNumber
        keyName="fe_sum_num"
        number={inShelterTotal}
        info={`全國公立收容所 ${detailedInfo.getNewestDateFormat()}`}
        title={"在所動物數"}
      />
      <PureNumber
        keyName="end_dog_max_percent"
        number={`${avgCapacityRate}%`}
        info={`全國公立收容所 ${detailedInfo.getNewestDateFormat()}`}
        title={"平均收容比例"}
      />
    </div>
  );
};

export default KeyMetrics;
