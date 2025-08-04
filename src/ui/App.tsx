import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Chart } from "./Chart";
import { useStatistics } from "./hooks/useStatistics";
import SelectOption from "./SelectOption";
import Header from "./Header";
import { useStaticData } from "./hooks/useStaticData";

function App() {
  const [view, setView] = useState<View>("CPU");
  const staticData = useStaticData();
  const statistics = useStatistics(10);

  useEffect(() => {
    const unsub = window.electron.subscribeView((view) => {
      setView(view);
    });
    return unsub;
  }, []);

  const cpuUsage = useMemo(
    () => statistics.map((data) => data.cpuUsage),
    [statistics]
  );

  const ramUsage = useMemo(
    () => statistics.map((data) => data.ramUsage),
    [statistics]
  );

  const storageUsage = useMemo(
    () => statistics.map((data) => data.storageUsage),
    [statistics]
  );

  const usageForMainScreen = useMemo(() => {
    switch (view) {
      case "CPU":
        return cpuUsage;
      case "RAM":
        return ramUsage;
      case "STORAGE":
        return storageUsage;
    }
  }, [cpuUsage, ramUsage, storageUsage, view]);

  return (
    <>
      <Header />
      <h1 className="appTitle">Resource Monitor App</h1>
      <div className="main">
        <div className="selectOptions">
          <SelectOption
            subTitle={staticData?.cpuModel ?? ""}
            data={cpuUsage}
            view={"CPU"}
            onClick={() => setView("CPU")}
          />
          <SelectOption
            subTitle={(staticData?.totalMemoryGB.toString() ?? "") + " GB"}
            data={ramUsage}
            view={"RAM"}
            onClick={() => setView("RAM")}
          />
          <SelectOption
            subTitle={(staticData?.totalStorage.toString() ?? "") + " GB"}
            data={storageUsage}
            view={"STORAGE"}
            onClick={() => setView("STORAGE")}
          />
        </div>
        <div className="mainGrid">
          <Chart selectedView={view} data={usageForMainScreen} maxPoints={10} />
        </div>
      </div>
    </>
  );
}

export default App;
