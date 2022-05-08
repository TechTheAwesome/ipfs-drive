import { Folder } from "@mui/icons-material";
import { Backdrop, CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { IPFS_STORE } from "../../env";
import { useLs } from "../../hooks/useMFS";

export default function StoreList() {
  const [entries, error] = useLs(IPFS_STORE);

  return (
    <>
      <Backdrop open={!Boolean(entries)}>
        <CircularProgress />
      </Backdrop>
      <h1 className=" text-center text-2xl">{error && error.toString()}</h1>
      <List>
        {entries?.filter(e=> e.type==='directory').map(e => {
          return <ListItem key={e.cid.toString()}>
            <ListItemButton component='a' href={`/drive/#/${e.name}`}>
              <ListItemIcon>
                <Folder/>
              </ListItemIcon>
              <ListItemText primary={e.name} secondary={e.cid.toV1().toString()}/>
            </ListItemButton>
          </ListItem>;
        })}
      </List>
    </>
  );
}