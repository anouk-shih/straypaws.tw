import { cityCode } from "./CityCode";

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
    let code = cityCode.find((city) => city.name === shelter.ShelterName)?.code;
    return { ...temp, cityCode: code };
  });

  MonthlySummary.forEach((summary) => {
    const sameDetailed = MonthlyDetailed.find((detailed) => detailed.rpt_country_code === summary.rpt_country_code);

    const temp: ShelterCombined = {
      cityName: summary.rpt_country,
      cityCode: summary.rpt_country_code,
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
