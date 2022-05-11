import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, List } from "@mui/material";
import { CID } from "ipfs-http-client";
import { IPFS_STORE_PATH } from "../../env";
import { TSetting, useSetting } from "../../hooks/useSetting";
import { useLs } from "../../hooks/useMFS";
import StoreListItem from "./StoreListItem";

export default function StoreList() {
  const [entries, error] = useLs(IPFS_STORE_PATH);
  const [readSetting, readError, writeSetting, writeError] = useSetting();
  const [liveSetting, setSetting] = useState<TSetting>();

  useEffect(() => {
    setSetting(readSetting);
  }, [readSetting],)

  useEffect(() => {
    if(!liveSetting) return;
    if(readSetting === liveSetting) return;
    console.log('setting saved: ');
    console.log(liveSetting);
    writeSetting(liveSetting);
  }, [liveSetting, readSetting, writeSetting])

  function isInitialized(cid: CID): boolean {
    if (!liveSetting) return false;

    const index = liveSetting.drive?.find(d => d.currentExpectResolveCID === cid.toV0().toString() || d.currentExpectResolveCID === cid.toV1().toString())
    if (index) return true;
    return false;
  }

  return (
    <>
      <Backdrop open={!Boolean(entries)}>
        <CircularProgress />
      </Backdrop>
      <h1 className=" text-center text-2xl">{error && "IPFS: " + error.toString()}</h1>
      <h1 className=" text-center text-2xl">{readError && "READ: " + readError.toString()}</h1>
      <h1 className=" text-center text-2xl">{writeError && "WRITE: " + writeError.toString()}</h1>
      <Button>Add Store</Button>
      <Button>Sync</Button>
      <List>
        {
          entries?.filter(e => e.type === 'directory')
            .map(e => {

              const initalized = isInitialized(e.cid);
              return <StoreListItem isInitialized={initalized} entry={e} key={e.cid.toV1().toString()} />;
            })
        }
      </List>
    </>
  );
}