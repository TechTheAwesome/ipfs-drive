import React, { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, Container } from "@mui/material";
import StoreList from "./StoreList";
import { IPFS_STORE } from "../../env";
import { useMkdir, useStat } from "../../hooks/useMFS";


export default function FileStore() {
  const [processing, setProcessing] = useState<boolean>(true);
  const [stat] = useStat(IPFS_STORE);
  const [mkdir, mkdirError] = useMkdir();

  useEffect(() => {
    if(stat) setProcessing(false);
    else setProcessing(true);
  }, [stat])

  function StoreCreate() {
    return (
      <Container>
        <h1 className=" text-center text-5xl">Please Create A new Store to Continue</h1>
        <Button variant='contained' onClick={() => mkdir(IPFS_STORE)}>
        CreateStore
        </Button>
        <h1 className=" text-center text-2xl">{mkdirError && mkdirError.toString()}</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Backdrop open={processing}>
        <CircularProgress />
      </Backdrop>
      {
        (() => {
          if(stat?.type === 'directory') return <StoreList/>
          return <StoreCreate />
        })()
      }
    </Container>
  );
}

