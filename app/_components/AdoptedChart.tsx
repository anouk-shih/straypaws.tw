"use client";

import { useEffect, useRef, useState } from "react";

import { colors } from "@/tailwind.config";
import * as Plot from "@observablehq/plot";

interface AdoptedChartProps {
  data: ShelterCombinedNational[];
}

const AdoptedChart: React.FC<AdoptedChartProps> = ({ data }) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const [adoptedData, setAdoptedData] = useState<{ date: string; count: number }[]>([]);
  const [acceptData, setAcceptData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    if (!data) return;
    setAdoptedData(() => {
      let temp = data.map((d) => ({
        date: `${Math.floor(d.date / 100)}/${d.date % 100 < 10 ? "0" + (d.date % 100) : d.date % 100}`,
        count: d?.summary?.adoptMonthly || 0,
      }));

      // return only the first 12 months
      return temp.slice(0, 12);
    });
  }, [data]);

  useEffect(() => {
    if (!data) return;
    setAcceptData(() => {
      let temp = data.map((d) => ({
        date: `${Math.floor(d.date / 100)}/${d.date % 100 < 10 ? "0" + (d.date % 100) : d.date % 100}`,
        count: d?.detailed?.monthlySum || 0,
      }));
      return temp.slice(0, 12);
    });
  }, [data]);

  useEffect(() => {
    if (!svgRef.current || !adoptedData || !acceptData) return;

    const plot = Plot.plot({
      color: { legend: true, domain: ["當月在所動物總數", "當月領養總數"], range: [colors.visual, colors.primary] },
      label: null,
      x: {
        grid: true,
        label: "隻",
      },
      y: {
        grid: true,
        label: "月份",
      },
      marks: [
        Plot.ruleX([0]),
        Plot.barX(acceptData, { y: "date", x: "count", fill: colors.visual }),
        Plot.text(acceptData, {
          x: "count",
          y: "date",
          text: (d) => `${d.count}`,
          dx: 5,
          lineAnchor: "bottom",
        }),
        Plot.areaX(adoptedData, { y: "date", x: "count", fill: colors.primary, fillOpacity: 0.7 }),
        Plot.lineX(adoptedData, { y: "date", x: "count", stroke: colors.primary }),
        Plot.tip(
          adoptedData,
          Plot.pointer({
            x: "count",
            y: "date",
            title: (d) => `月份 ${d.date}\n\n總領養數：${d.count}隻`,
          })
        ),
      ],
    });
    svgRef.current.append(plot);
    return () => plot.remove();
  }, [adoptedData, acceptData]);

  return <div ref={svgRef} className="adopted-chart" />;
};

export default AdoptedChart;
