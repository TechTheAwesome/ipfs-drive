import { FileCopy, Folder } from "@mui/icons-material";
import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import all from "it-all";
import React, { useEffect, useState } from "react";
import byteSize from "byte-size";
import { MFSEntry } from "ipfs-core-types/src/files";
import useIpfs from "../hooks/use-ipfs";
import { STORE } from "../ipfs/client";

export default function Drive() {
  const [items, setItems] = useState<JSX.Element[]>();
  const {ipfs} =useIpfs()
  useEffect(() => {
    if(!ipfs) return;
    all(ipfs.files.ls('/' + STORE)).then(
      i => {
        setItems(i.map(e => ParseListItem(e)))
      }
    )
  })

  return (
    <Container>
      <List>
        {items}
      </List>		
    </Container>
  );
}

function ParseListItem(item: MFSEntry) {
  const {value, unit} = byteSize(item.size)

  return(
    <ListItem key={item.cid.toString()}>
      <ListItemButton>
        <ListItemIcon>
          {item.type === "directory"? <Folder/> : <FileCopy/>}
        </ListItemIcon>
        <ListItemText primary={item.name} secondary={item.type === "file" && `${value} ${unit}`} />
      </ListItemButton>
    </ListItem>
  );
}