import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Chart } from "./Chart";
import { useStatistics } from "./hooks/useStatistics";
import SelectOption from "./SelectOption";
import Header from "./Header";

function App() {
  const useStaticData = () => {
    const [staticData, setStaticData] = useState<StaticData>();

    useEffect(() => {
      (async () => {
        setStaticData(await window.electron.getStaticData());
      })();
    }, []);
    return staticData;
  };

  useEffect(() => {
    const unsub = window.electron.subscribeView((view) => {
      setView(view);
    });
    return unsub;
  }, []);

  const [view, setView] = useState<View>("CPU");

  const staticData = useStaticData();

  const statistics = useStatistics(10);

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

  // useEffect(() => {
  //   const unsub = window.electron.subscribeStatistics((stats) =>
  //     console.log("Stats: ", stats)
  //   );
  //   return unsub;
  // }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // window.electron.getStaticData();

  //  <div style={{ height: 140 }}>
  //       <BaseChart
  //         data={[{ value: 0 }, { value: 30 }, { value: 100 }]}
  //       ></BaseChart>
  //     </div>

  return (
    <>
      <Header />
      <h1 className="appTitle">Resource Manager App</h1>
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
