import { useMemo } from "react";
import { BaseChart } from "./BaseChart";

type ChartProps = {
  data: number[];
  maxPoints: number;
};

export const Chart = (props: ChartProps) => {
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
  return <BaseChart data={processedData} />;
};
