import { useEffect, useState } from "react";

export const useStatistics = (dataPointLimit: number): Statistics[] => {
  const [value, setValue] = useState<Statistics[]>([]);

  useEffect(() => {
    window.electron.startPolling();
    const unsub = window.electron.subscribeStatistics((stats) => {
      setValue((prev) => {
        const newStats = [...prev, stats];
        if (newStats.length > dataPointLimit) {
          newStats.shift();
        }
        return newStats;
      });
    });

    return unsub;
  }, [dataPointLimit]);

  return value;
};
