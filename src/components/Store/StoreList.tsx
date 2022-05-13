import React, {useState } from "react";
import { Backdrop, Button, CircularProgress, List } from "@mui/material";
import { CID } from "ipfs-http-client";
import { IPFS_KEY_NAME, IPFS_STORE_PATH } from "../../env";
import { useSetting } from "../../hooks/useSetting";
import { useLs } from "../../hooks/useMFS";
import StoreListItem from "./StoreListItem";
import useIpfs from "../../hooks/use-ipfs";
import { getSetting, setSetting } from "../../setting";

export default function StoreList() {
  const [entries, error] = useLs(IPFS_STORE_PATH);
  const [readSetting, readError, writeSetting, writeError] = useSetting();
  const [foo, doUpdate] = useState<boolean>(true);
  const {ipfs} = useIpfs();

  setSetting(readSetting)

  function isInitialized(cid: CID): boolean {
    
    const index = getSetting().drive.find(d => {
      return d.currentExpectResolveCID.includes(cid.toV0().toString()) || d.currentExpectResolveCID.includes(cid.toV1().toString());
    })
    if (index) return true;
    return false;
  }

  async function handleInitDrive(driveName: string, cid: CID) {
    const keyName = `${IPFS_KEY_NAME}-${driveName}`;
    if(!ipfs) return;
    if(!readSetting) return;
    if(readSetting.key.filter(k => k.name === keyName ).length) return;

    console.log(`try init drive ${keyName}`);
    try {
      const resultKey = await ipfs.key.gen(keyName);
      console.log('generated key!');
      const resultPublish = await ipfs.name.publish(cid, {key: resultKey.name})
      console.log('published drive with key!');
      if(!resultKey && !resultPublish) return;
      let newSetting = getSetting();
      newSetting.drive.push({
        name: driveName,
        key: resultKey,
        currentExpectResolveCID: resultPublish.value,
      })
      newSetting.key.push(resultKey);
      setSetting(newSetting);
      writeSetting(newSetting)
      doUpdate(!foo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Backdrop open={!Boolean(entries)}>
        <CircularProgress />
      </Backdrop>
      <h1 className=" text-center text-2xl">{error && "IPFS: " + error.toString()}</h1>
      <h1 className=" text-center text-2xl">{readError && "READ: " + readError.toString()}</h1>
      <h1 className=" text-center text-2xl">{writeError && "WRITE: " + writeError.toString()}</h1>
      <Button>Add Drive</Button>
      <Button>Sync</Button>
      <List>
        {
          entries?.filter(e => e.type === 'directory')
            .map(e => {

              const initalized = isInitialized(e.cid);
              return <StoreListItem key={e.cid.toV1().toString()} 
                isInitialized={initalized} entry={e} onInit={() => {
                  handleInitDrive(e.name, e.cid);
                }}/>;
            })
        }
      </List>
    </>
  );
}