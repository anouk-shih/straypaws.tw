const OpenDataAPI = `https://data.moa.gov.tw/Service/OpenData/TransService.aspx`;

const infoId = "2thVboChxuKs";
const SummaryId = `DyplMIk3U1hf`;
const DetailedId = `p9yPwrCs2OtC`;

export const getShelterRoute = (type: "info" | "summary" | "detailed") => {
  let id = "";
  switch (type) {
    case "info":
      id = infoId;
      break;
    case "summary":
      id = SummaryId;
      break;
    case "detailed":
      id = DetailedId;
      break;
    default:
      break;
  }

  return `${OpenDataAPI}?UnitId=${id}`;
};
