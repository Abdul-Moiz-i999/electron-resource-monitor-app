import osUtils from "os-utils";
import fs from "fs";
import os from "os";

const POLLING_INTERVAL = 500;
export const pollResources = () => {
  setInterval(async () => {
    const result = await getCpuUsage();
    console.log(
      "Result: ",
      result,
      "getRamUsage: ",
      getRamUsage(),
      "Disk: ",
      getDiskData()
    );
  }, POLLING_INTERVAL);
};

export const getStaticData = () => {
  const totalStorage = getDiskData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

  return {
    totalStorage,
    cpuModel,
    totalMemoryGB,
  };
};

const getCpuUsage = () => {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
};

const getRamUsage = () => {
  return 1 - osUtils.freememPercentage();
};

const getDiskData = () => {
  // FS module require node 18+
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
};
