import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container } from "@mui/material";
import Drive from "./Drive";
import useIpfs from "../hooks/use-ipfs";
import { STORE } from "../ipfs/client";


export default function FileStore() {
  const [store, setStore] = useState<string | undefined>(undefined);
  const [processing, setProcessing] = useState<boolean>(true);
  const { ipfs } = useIpfs();

  useEffect(() => {
    setProcessing(true);
    if(!ipfs) return;
    ipfs.files.stat('/'+STORE)
      .then(a => {
        if(a.type === 'directory')
          setStore(STORE);
        setProcessing(false);
      })
      .catch(e => {
        setStore(undefined)
        setProcessing(false);
      })
  }, [store, ipfs]);

  function StoreCreate() {
    const { ipfs } = useIpfs();
    return (
      <Container>
        <h1 className=" text-center text-5xl">Please Create A new Store to Continue</h1>
        <Button variant='contained' onClick={async () => {
          if(!ipfs) return;
          await ipfs.files.mkdir('/'+ STORE).then(() => setStore('/'+ STORE)) 
        }}>
        CreateStore
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      {
        (() => {
          if(store) return <Drive/>
          if(!processing) return <StoreCreate />
          return <CircularProgress />
        })()
      }
    </Container>
  );
}

