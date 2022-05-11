import all from "it-all";
import { useEffect, useState } from "react"
import useIpfs from "./use-ipfs";
import { MFSEntry, StatResult } from 'ipfs-core-types/src/files'
import toBuffer from "it-to-buffer";

export function useLs(path: string): [MFSEntry[]|undefined, any] {
  const {ipfs} = useIpfs();
  const [entries, setEntries] = useState<MFSEntry[]>();
  const [error, setError] = useState<any>(null);


  useEffect(() => {
    (async function() {
      if(!ipfs) return setError("IPFS not initiaized!");
      try {
        const entries = await all(ipfs.files.ls(path));
        if(entries) setEntries(entries);
        else setEntries(undefined);
        setError(undefined);
      }catch (error) {
        setEntries(undefined);
        setError(error);
      }
    })()
  }, [ipfs, path]);
  
  return [entries, error]
}

export function useStat(path: string): [StatResult|undefined, any] {
  const {ipfs} = useIpfs();
  const [stat, setStat] = useState<StatResult>();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async function() {
      if(!ipfs) return setError("IPFS not initiaized!");
      try {
        setStat(await ipfs.files.stat(path))
        setError(undefined);
      } catch (error) {
        setError(error);
      }
    })()
  }, [ipfs, path])

  return [stat, error];
}

export function useMkdir(): [ (path: string) => Promise<void>, any ] {
  const {ipfs} = useIpfs();
  const [error, setError] = useState<any>(null);

  async function mkdir(path: string) {
    if(!ipfs) return setError("IPFS not initiaized!");
    try {
      await ipfs.files.mkdir(path);
      setError(undefined);
    }catch (error) {
      console.log('make dir error! ' + error)
      setError(error);
    }
  }

  return [mkdir, error]
}

export function useWriteJson(): [(path: string, json: string) => Promise<void>, any] {
  const {ipfs} = useIpfs();
  const [error, setError] = useState<any>(null);
  
  async function writeJson(path: string, json: string) {
    if(!ipfs) return setError("IPFS not initiaized!");
    try{
      await ipfs.files.rm(path);
      await ipfs.files.write(path, json, { create: true })
      setError(null);
    }catch(e) {
      setError(e);
    }
  }

  return [writeJson, error];
}

export function useReadJson(path: string) {
  const {ipfs} = useIpfs();
  const [json, setJson] = useState<any>();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async function() {
      if(!ipfs) return setError("IPFS not initiaized!");
      try {
        const chunks = await toBuffer(ipfs.files.read(path));
        const string = new TextDecoder().decode(chunks);
        const json = JSON.parse(string);

        setJson(json);
        setError(null);
      } catch (error) {
        setError(error);
      }
    })()
  }, [ipfs, path])

  return [json, error];
}