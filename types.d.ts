type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type UnsubscribeFunction = () => void;

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type View = "cpuUsage" | "ramUsage" | "storageUsage";

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  subscribeView: View;
};

interface Window {
  electron: {
    subscribeView: (callback: (view: View) => void) => UnsubscribeFunction;
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
  };
}
