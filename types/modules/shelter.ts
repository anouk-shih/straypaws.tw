// 公立收容所資料

interface ShelterInfo {
  ID: string;
  ShelterName: string; // 收容所名稱
  CityName: string; // 縣市名稱
  Address: string; // 地址
  Phone: string; // 電話
  OpenTime: string; // 營業時間
  Url: string; // 網址
  Lon: string; // 經度
  Lat: string; // 緯度
  Seq: number; // 排序
}

// 全國公立動物收容所收容處理情形統計表
interface ShelterSummary {
  ID: number; // 流水號
  rpt_year: number; // 年度
  rpt_country_code: string; // 縣市代碼
  rpt_country: string; // 縣市名
  rpt_month: number; // 月份
  accept_num: number; // 收容隻數_隻
  adopt_num: number; // 認領養數_隻
  adopt_rate: string; // 認領養率_%
  adopt_total: number; // 總認養數
  end_num: number; // 人道處理數_隻
  end_rate: string; // 人道處理率_%
  dead_num: number; // 所內死亡數_隻
  dead_rate: string; // 所內死亡率_%
}

// 全國公立動物收容所收容處理情形統計表(細項)
interface ShelterDetailed {
  ID: number; // 流水號
  rpt_year: number; // 年度
  rpt_country_code: string; // 縣市代碼
  rpt_country: string; // 縣市名
  rpt_month: number; // 月份
  max_stay_dog_num: number; // 可留容犬最大值
  max_stay_cat_num: number; // 可留容貓最大值
  fs_gg_num: number; // 在養_數收容所
  fs_ms_num: number; // 在養數_委託代養
  fs_sum_num: number; // 在養數_小計
  in_gg_num: number; // 入所_政府捕捉
  in_ms_num: number; // 入所_拾獲送交
  in_lv_num: number; // 入所_不擬續養
  in_bk_num: number; // 入所_認養退回
  in_re_num: number; // 入所_動物救援
  in_lw_num: number; // 入所_依法沒入
  in_els_num: number; // 入所_其他
  in_tot_num: number; // 入所_合計入所數
  out_tback_num: number; // 領回
  out_ad_ca_num: number; // 領養_個人認養
  out_ad_fa_num: number; // 領養_民間犬場
  out_ad_cv_num: number; // 領養_動保團體
  out_hs_3_num: number; // 動保法第12條第1項第3款
  out_hs_5_num: number; // 動保法第12條第1項第5款
  out_hs_7_num: number; // 動保法第12條第1項第7款
  out_hs_ot_num: number; // 其他法令授權
  out_sd_num: number; // 所內死亡_疾病死亡
  out_jd_num: number; // 所內死亡_生理耗弱死亡
  out_rl_num: number; // 出所_釋回原地
  out_ec_num: number; // 出所_逃脫
  out_el_num: number; // 出所_其他
  out_tot_num: number; // 出所_合計數
  fe_gg_num: number; // 在養數_收容所
  fe_ms_num: number; // 在養數_委託代養
  fe_sum_num: number; // 在養數_小計
  end_dog_max_percent: string; // 犬_在養占可留容比例
  end_cat_max_percent: string; // 貓_在養占可留容比例
}

interface ShelterCombined {
  cityName: string;
  cityCode: string;
  year: number;
  month: number;
  shelters: {
    id: string;
    name: string;
    address: string;
    phone: string;
    openTime: string;
    url: string;
    lng: number;
    lat: number;
  }[];
  citySummary: {
    year: number;
    month: number;
    acceptMonthly: number;
    adoptMonthly: number;
    endMonthly: number;
    deadMonthly: number;
  };
  cityDetailed?: {
    year: number;
    month: number;
    maxCapableDog: number;
    maxCapableCat: number;
    prevGg: number;
    prevMs: number;
    prevSum: number;
    inGg: number;
    inMs: number;
    inLv: number;
    inBk: number;
    inRe: number;
    inLw: number;
    inEls: number;
    inTotal: number;
    outTback: number;
    outAdCa: number;
    outAdFa: number;
    outAdCv: number;
    outHs3: number;
    outHs5: number;
    outHs7: number;
    outHsOt: number;
    outSd: number;
    outJd: number;
    outRl: number;
    outEc: number;
    outEl: number;
    outTotal: number;
    monthlyGg: number;
    monthlyMs: number;
    monthlySum: number;
    stayDogCapableRate: number;
    stayCatCapableRate: number;
  };
}

interface ShelterCombinedNational
  extends Omit<ShelterCombined, "cityName" | "cityCode" | "citySummary" | "cityDetailed" | "year" | "month"> {
  date: number; // ex:11302
  summary?: ShelterCombined["citySummary"];
  detailed?: ShelterCombined["cityDetailed"];
}
