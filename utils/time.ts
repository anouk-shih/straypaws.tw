import dayjs from "dayjs";

export const getTWYear = () => {
  return dayjs().year() - 1911;
};

export const getNewestDate = <T extends ShelterSummary | ShelterDetailed | ShelterCombined>(data: T[]) => {
  const currentYear = getTWYear();
  const currentMonth = dayjs().month() + 1;

  let pointYear = currentYear;
  let pointMonth = currentMonth;
  // Find the newest month in the data
  const findNewestMonth = (data: T[], counter: number): { year: number; month: number } => {
    if (counter > 10) {
      // Base case: too many iterations, return the first
      return {
        year: "year" in data[0] ? data[0].year : data[0].rpt_year,
        month: "month" in data[0] ? data[0].month : data[0].rpt_month,
      };
    }

    const hasPoint = data.find((item) => {
      const isCombined = "year" in item && "month" in item;
      if (isCombined) {
        return item.year === pointYear && item.month === pointMonth;
      }
      return item.rpt_year === pointYear && item.rpt_month === pointMonth;
    });

    if (hasPoint) {
      // Found the newest month, return the year and month
      return { year: pointYear, month: pointMonth };
    }

    if (pointMonth === 1) {
      pointMonth = 12;
      pointYear--;
    } else {
      pointMonth--;
    }

    // Recursive case: check the next item in the data
    return findNewestMonth(data, counter + 1);
  };

  return findNewestMonth(data, 0);
};

export const getOldestDate = <T extends ShelterSummary | ShelterDetailed>(data: T[]) => {
  const oldestData = data[data.length - 1];
  return { year: oldestData.rpt_year, month: oldestData.rpt_month };
};
