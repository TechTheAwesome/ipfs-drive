import { DEFAULT_SETTING, IPFS_CONFIG_PATH } from "../env";
import { useReadJson, useWriteJson } from "./useMFS";

export type TSetting = {
  drive: 
  {
    name: string,
    key: {
      name: string,
      id: string
    },
    currentExpectResolveCID: string
  }[],
  key: {
    name: string,
    id: string
  }[]
}

export function useSetting(): [TSetting, any, (setting: TSetting) => void, any] {
  const [json, readError] = useReadJson(IPFS_CONFIG_PATH);
  const [writeJson, writeError] = useWriteJson();

  function writeSetting(setting: TSetting) {
    const string = JSON.stringify(setting);
    writeJson(IPFS_CONFIG_PATH, string);
  }

  return [json? json as TSetting: DEFAULT_SETTING, readError, writeSetting, writeError];
}