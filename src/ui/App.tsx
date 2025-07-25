import { useEffect, useMemo, useState } from "react";
import "./App.css";
import reactLogo from "../assets/react.svg";
import { Chart } from "./Chart";
import { useStatistics } from "./hooks/useStatistics";
function App() {
  const [count, setCount] = useState(0);
  const [view, setView] = useState<View>("cpuUsage");

  const statistics = useStatistics(10);

  const cpuUsage = useMemo(
    () => statistics.map((data) => data[view]),
    [statistics, view]
  );

  // console.log("Statistics: ", statistics);

  useEffect(() => {
    const unsub = window.electron.subscribeView((view) => {
      setView(view);
    });
    return unsub;
  }, []);

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
      <header>
        <button
          id="minimize"
          onClick={() => window.electron.sendHeaderAction("MINIMIZE")}
        />
        <button
          id="maximize"
          onClick={() => window.electron.sendHeaderAction("MAXIMIZE")}
        />
        <button
          id="close"
          onClick={() => window.electron.sendHeaderAction("CLOSE")}
        />
      </header>
      <div>
        <div style={{ height: 140 }}>
          <Chart data={cpuUsage} maxPoints={10} />
        </div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count isss {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
