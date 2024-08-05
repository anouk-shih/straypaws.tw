"use client";

import { useEffect, useRef, useState } from "react";

import { colors } from "@/tailwind.config";
import * as Plot from "@observablehq/plot";

// svg size
const width = 800;
const height = 600;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

interface AdoptedChartProps {
  data: ShelterCombinedNational[];
}

const AdoptedChart: React.FC<AdoptedChartProps> = ({ data }) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const [adoptedData, setAdoptedData] = useState<{ 月份: string; 隻: number }[]>([]);
  const [acceptData, setAcceptData] = useState<{ 月份: string; 隻: number }[]>([]);

  useEffect(() => {
    if (!data) return;
    setAdoptedData(() => {
      let temp = data.map((d) => ({
        月份: `${Math.floor(d.date / 100)}/${d.date % 100 < 10 ? "0" + (d.date % 100) : d.date % 100}`,
        隻: d?.summary?.adoptMonthly || 0,
      }));

      // return only the first 12 months
      return temp.slice(0, 12);
    });
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setAcceptData(() => {
      let temp = data.map((d) => ({
        月份: `${Math.floor(d.date / 100)}/${d.date % 100 < 10 ? "0" + (d.date % 100) : d.date % 100}`,
        隻: d?.detailed?.monthlySum || 0,
      }));
      return temp.slice(0, 12);
    });
  }, [data]);

  useEffect(() => {
    if (!svgRef.current || !adoptedData || !acceptData) return;

    const plot = Plot.plot({
      color: { legend: true },
      marks: [
        Plot.ruleX([0]),
        Plot.barX(acceptData, { y: "月份", x: "隻", fill: colors.visual, tip: true }),
        Plot.areaX(adoptedData, { y: "月份", x: "隻", fill: colors.primary, fillOpacity: 0.7 }),
        Plot.lineX(adoptedData, { y: "月份", x: "隻", stroke: colors.primary, tip: true }),
      ],
    });
    svgRef.current.append(plot);
    return () => plot.remove();
  }, [adoptedData, acceptData]);

  return <div ref={svgRef} className="adopted-chart" />;
};

export default AdoptedChart;
