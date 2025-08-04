import { useEffect, useState } from "react";

export const useStaticData = () => {
  const [staticData, setStaticData] = useState<StaticData>();
  useEffect(() => {
    (async () => {
      setStaticData(await window.electron.getStaticData());
    })();
  }, []);
  return staticData;
};
