const OpenDataAPI = `https://data.moa.gov.tw/Service/OpenData/TransService.aspx`;

const SummaryId = `DyplMIk3U1hf`;
const DetailedId = `p9yPwrCs2OtC`;

export const getShelterAPI = (type: "summary" | "detailed") => {
  return `${OpenDataAPI}?UnitId=${type === "summary" ? SummaryId : DetailedId}`;
};
