import { FileCopy, Folder } from "@mui/icons-material";
import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import all from "it-all";
import React, { useEffect, useState } from "react";
import { GetIPFS } from "../ipfs/client";
import byteSize from "byte-size";
import { MFSEntry } from "ipfs-core-types/src/files";

export default function Drive() {
  const [items, setItems] = useState<JSX.Element[]>();
  useEffect(() => {
    all(GetIPFS()!.files.ls('/')).then(
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