import { getNewestDate } from "@/utils/time";

export class DataInfo<T extends ShelterSummary | ShelterDetailed> {
  data: T[];
  constructor(data: T[]) {
    this.data = data;
  }
  getNewestDate() {
    return getNewestDate(this.data);
  }
  getNewestDateFormat() {
    return `${this.getNewestDate().year} 年 ${this.getNewestDate().month} 月`;
  }
  getNewestDataSet(): T[] {
    return this.data.filter(
      (item: T) => item.rpt_year === this.getNewestDate().year && item.rpt_month === this.getNewestDate().month
    );
  }
}

