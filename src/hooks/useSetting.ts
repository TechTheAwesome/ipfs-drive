import { useEffect } from "react";
import { IPFS_CONFIG_PATH } from "../env";
import { useReadJson, useWriteJson } from "./useMFS";

export type TSetting = {
  drive: 
  {
    name: string,
    key: {
      name: string,
      ID: string
    },
    currentExpectResolveCID: string
  }[]
}

export function useSetting(): [TSetting|undefined, any, (setting: TSetting) => void, any] {
  const [json, readError] = useReadJson(IPFS_CONFIG_PATH);
  const [writeJson, writeError] = useWriteJson();

  function writeSetting(setting: TSetting) {
    const string = JSON.stringify(setting);
    writeJson(IPFS_CONFIG_PATH, string);
  }

  useEffect(() => {
    if(!json) return 

  })

  return [json as TSetting | undefined, readError, writeSetting, writeError];
}