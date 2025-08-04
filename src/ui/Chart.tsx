import { useMemo } from "react";
import { BaseChart } from "./BaseChart";

type ChartProps = {
  data: number[];
  maxPoints: number;
  selectedView: "CPU" | "RAM" | "STORAGE";
};

const COLOR_MAP = {
  CPU: {
    stroke: "#5DD4EE",
    fill: "#0A4D5C",
  },
  RAM: {
    stroke: "#E99311",
    fill: "#5F3C07",
  },
  STORAGE: {
    stroke: "#1ACF4D",
    fill: "#0B5B22",
  },
};

export const Chart = (props: ChartProps) => {
  const color = useMemo(
    () => COLOR_MAP[props.selectedView],
    [props.selectedView]
  );
  const processedData = useMemo(() => {
    const points = props?.data.map((usagePoint) => ({
      value: usagePoint * 100,
    }));

    if (points.length < props.maxPoints) {
      return [
        ...points,
        ...Array.from({ length: props.maxPoints - points.length }, () => ({
          value: undefined,
        })),
      ];
    }
    return points;
  }, [props?.data, props?.maxPoints]);
  return (
    <BaseChart data={processedData} fill={color.fill} stroke={color.stroke} />
  );
};
