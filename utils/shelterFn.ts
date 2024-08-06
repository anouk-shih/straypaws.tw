import { GeometryNShelter, PureTwTopoJson, TwTopoJson } from "@/types/topoJson";

import { cityCode } from "./CityCode";
import { getNewestDate } from "./time";

export function combineShelterDataMonthly(
  shelterInfo: ShelterInfo[],
  shelterSummary: ShelterSummary[],
  shelterDetailed: ShelterDetailed[],
  month: { year: number; month: number }
): ShelterCombined[] {
  const combinedData: ShelterCombined[] = [];

  const MonthlySummary = shelterSummary.filter(
    (summary) => summary.rpt_year === month.year && summary.rpt_month === month.month
  );

  const MonthlyDetailed = shelterDetailed.filter(
    (detailed) => detailed.rpt_year === month.year && detailed.rpt_month === month.month
  );
  const info = shelterInfo.map((shelter) => {
    let temp = { ...shelter };
    let code = cityCode.find((city) => city.name === shelter.CityName)?.code;
    return { ...temp, cityCode: code };
  });

  MonthlySummary.forEach((summary) => {
    const sameDetailed = MonthlyDetailed.find((detailed) => detailed.rpt_country_code === summary.rpt_country_code);

    const temp: ShelterCombined = {
      cityName: summary.rpt_country,
      cityCode: summary.rpt_country_code,
      year: summary.rpt_year,
      month: summary.rpt_month,
      shelters: info
        .filter((shelter) => shelter.cityCode === summary.rpt_country_code)
        .map((shelter) => ({
          id: shelter.ID,
          name: shelter.ShelterName,
          address: shelter.Address,
          phone: shelter.Phone,
          openTime: shelter.OpenTime,
          url: shelter.Url,
          lng: Number(shelter.Lon),
          lat: Number(shelter.Lat),
        })),
      citySummary: {
        year: summary.rpt_year,
        month: summary.rpt_month,
        acceptMonthly: summary.accept_num,
        adoptMonthly: summary.adopt_num,
        endMonthly: summary.end_num,
        deadMonthly: summary.dead_num,
      },
      cityDetailed: sameDetailed
        ? {
            year: sameDetailed.rpt_year,
            month: sameDetailed.rpt_month,
            maxCapableDog: sameDetailed.max_stay_dog_num,
            maxCapableCat: sameDetailed.max_stay_cat_num,
            prevGg: sameDetailed.fs_gg_num,
            prevMs: sameDetailed.fs_ms_num,
            prevSum: sameDetailed.fs_sum_num,
            inGg: sameDetailed.in_gg_num,
            inMs: sameDetailed.in_ms_num,
            inLv: sameDetailed.in_lv_num,
            inBk: sameDetailed.in_bk_num,
            inRe: sameDetailed.in_re_num,
            inLw: sameDetailed.in_lw_num,
            inEls: sameDetailed.in_els_num,
            inTotal: sameDetailed.in_tot_num,
            outTback: sameDetailed.out_tback_num,
            outAdCa: sameDetailed.out_ad_ca_num,
            outAdFa: sameDetailed.out_ad_fa_num,
            outAdCv: sameDetailed.out_ad_cv_num,
            outHs3: sameDetailed.out_hs_3_num,
            outHs5: sameDetailed.out_hs_5_num,
            outHs7: sameDetailed.out_hs_7_num,
            outHsOt: sameDetailed.out_hs_ot_num,
            outSd: sameDetailed.out_sd_num,
            outJd: sameDetailed.out_jd_num,
            outRl: sameDetailed.out_rl_num,
            outEc: sameDetailed.out_ec_num,
            outEl: sameDetailed.out_el_num,
            outTotal: sameDetailed.out_tot_num,
            monthlyGg: sameDetailed.fe_gg_num,
            monthlyMs: sameDetailed.fe_ms_num,
            monthlySum: sameDetailed.fe_sum_num,
            stayCatCapableRate: Number(sameDetailed.end_cat_max_percent.replace("%", "")),
            stayDogCapableRate: Number(sameDetailed.end_dog_max_percent.replace("%", "")),
          }
        : undefined,
    };

    combinedData.push(temp);
  });

  return combinedData;
}

export function combineGeoDataNShelterData(shelters: ShelterCombined[], geoData: PureTwTopoJson): TwTopoJson {
  const geometries = geoData.objects.twTopoJson.geometries.map((geometry) => {
    const sameCity = shelters.find((shelter) => shelter.cityName === geometry.properties?.COUNTYNAME);
    const temp = { ...geometry.properties, shelter: sameCity } as GeometryNShelter;

    return { ...geometry, properties: temp };
  });

  return {
    ...geoData,
    objects: {
      twTopoJson: {
        ...geoData.objects.twTopoJson,
        geometries,
      },
    },
  };
}

export function getNationalData(
  shelterInfo: ShelterInfo[],
  shelterSummary: ShelterSummary[],
  shelterDetailed: ShelterDetailed[]
): ShelterCombinedNational[] {
  // get newest date from data
  const currentDate = getNewestDate(shelterSummary).year * 100 + getNewestDate(shelterSummary).month;

  const breakDate = 10901;

  let arr: ShelterCombinedNational[] = [];

  let pointDate = currentDate;

  const combinedSameMonthData = () => {
    // set break point
    if (pointDate < breakDate) return arr;

    const data = combineShelterDataMonthly(shelterInfo, shelterSummary, shelterDetailed, {
      year: Math.floor(pointDate / 100),
      month: pointDate % 100,
    });

    // if no data, add empty data to arr
    if (data.length === 0) arr.push({ date: pointDate, shelters: [] });

    // if has pointed data, add to arr
    if (data.length > 0) {
      let temp = {} as ShelterCombinedNational;

      data.forEach((item) => {
        temp = {
          date: item.year * 100 + item.month,
          shelters: [...(temp?.shelters || []), ...item.shelters],
          summary: {
            year: item.citySummary.year,
            month: item.citySummary.month,
            acceptMonthly: (temp?.summary?.acceptMonthly || 0) + item.citySummary.acceptMonthly,
            adoptMonthly: (temp?.summary?.adoptMonthly || 0) + item.citySummary.adoptMonthly,
            endMonthly: (temp?.summary?.endMonthly || 0) + item.citySummary.endMonthly,
            deadMonthly: (temp?.summary?.deadMonthly || 0) + item.citySummary.deadMonthly,
          },
          detailed: {
            year: item.year,
            month: item.month,
            maxCapableDog: (temp?.detailed?.maxCapableDog || 0) + (item.cityDetailed?.maxCapableDog || 0),
            maxCapableCat: (temp?.detailed?.maxCapableCat || 0) + (item.cityDetailed?.maxCapableCat || 0),
            prevGg: (temp?.detailed?.prevGg || 0) + (item.cityDetailed?.prevGg || 0),
            prevMs: (temp?.detailed?.prevMs || 0) + (item.cityDetailed?.prevMs || 0),
            prevSum: (temp?.detailed?.prevSum || 0) + (item.cityDetailed?.prevSum || 0),
            inGg: (temp?.detailed?.inGg || 0) + (item.cityDetailed?.inGg || 0),
            inMs: (temp?.detailed?.inMs || 0) + (item.cityDetailed?.inMs || 0),
            inLv: (temp?.detailed?.inLv || 0) + (item.cityDetailed?.inLv || 0),
            inBk: (temp?.detailed?.inBk || 0) + (item.cityDetailed?.inBk || 0),
            inRe: (temp?.detailed?.inRe || 0) + (item.cityDetailed?.inRe || 0),
            inLw: (temp?.detailed?.inLw || 0) + (item.cityDetailed?.inLw || 0),
            inEls: (temp?.detailed?.inEls || 0) + (item.cityDetailed?.inEls || 0),
            inTotal: (temp?.detailed?.inTotal || 0) + (item.cityDetailed?.inTotal || 0),
            outTback: (temp?.detailed?.outTback || 0) + (item.cityDetailed?.outTback || 0),
            outAdCa: (temp?.detailed?.outAdCa || 0) + (item.cityDetailed?.outAdCa || 0),
            outAdFa: (temp?.detailed?.outAdFa || 0) + (item.cityDetailed?.outAdFa || 0),
            outAdCv: (temp?.detailed?.outAdCv || 0) + (item.cityDetailed?.outAdCv || 0),
            outHs3: (temp?.detailed?.outHs3 || 0) + (item.cityDetailed?.outHs3 || 0),
            outHs5: (temp?.detailed?.outHs5 || 0) + (item.cityDetailed?.outHs5 || 0),
            outHs7: (temp?.detailed?.outHs7 || 0) + (item.cityDetailed?.outHs7 || 0),
            outHsOt: (temp?.detailed?.outHsOt || 0) + (item.cityDetailed?.outHsOt || 0),
            outSd: (temp?.detailed?.outSd || 0) + (item.cityDetailed?.outSd || 0),
            outJd: (temp?.detailed?.outJd || 0) + (item.cityDetailed?.outJd || 0),
            outRl: (temp?.detailed?.outRl || 0) + (item.cityDetailed?.outRl || 0),
            outEc: (temp?.detailed?.outEc || 0) + (item.cityDetailed?.outEc || 0),
            outEl: (temp?.detailed?.outEl || 0) + (item.cityDetailed?.outEl || 0),
            outTotal: (temp?.detailed?.outTotal || 0) + (item.cityDetailed?.outTotal || 0),
            monthlyGg: (temp?.detailed?.monthlyGg || 0) + (item.cityDetailed?.monthlyGg || 0),
            monthlyMs: (temp?.detailed?.monthlyMs || 0) + (item.cityDetailed?.monthlyMs || 0),
            monthlySum: (temp?.detailed?.monthlySum || 0) + (item.cityDetailed?.monthlySum || 0),
            stayCatCapableRate:
              (temp?.detailed?.stayCatCapableRate || 0) + (item.cityDetailed?.stayCatCapableRate || 0),
            stayDogCapableRate:
              (temp?.detailed?.stayDogCapableRate || 0) + (item.cityDetailed?.stayDogCapableRate || 0),
          },
        };
      });
      arr.push(temp);
    }

    // set next point
    if (pointDate % 100 === 1) {
      pointDate = pointDate - 100 + 12;
      pointDate--;
    } else {
      pointDate--;
    }

    return combinedSameMonthData();
  };

  return combinedSameMonthData();
}
