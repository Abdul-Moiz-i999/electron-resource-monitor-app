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

type View = "CPU" | "RAM" | "STORAGE";
type HeaderAction = "MINIMIZE" | "MAXIMIZE" | "CLOSE";

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  subscribeView: View;
  sendHeaderAction: HeaderAction;
};

type EventMapping = {
  startPolling: "startPolling";
  stopPolling: "stopPolling";
};

interface Window {
  electron: {
    subscribeView: (callback: (view: View) => void) => UnsubscribeFunction;
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
    sendHeaderAction: (payload: HeaderAction) => void;
    // stopPolling: () => void;
    // startPolling: () => void;
  };
}
