import { KeyRounded } from "@mui/icons-material";
import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import useIpfs from "../hooks/use-ipfs";
export default function Keys() {
  const [items, setItems] = useState<JSX.Element[]>();
  const {ipfs } = useIpfs();
  
  useEffect(() => {
    if(!ipfs) return;
    ipfs.key.list()
      .then(l => setItems(l.map(i => 
        <ListItem key={i.id}>
          <ListItemButton onClick={async () => {
            console.log(await ipfs.key.export(i.name, "password"))
          }}>
            <ListItemIcon>
              <KeyRounded/>
            </ListItemIcon>
            <ListItemText primary={i.name} secondary={i.id}/>
          </ListItemButton>
        </ListItem>)))
  })
  return (
    <Container>
      <List>
        {items}
      </List>
    </Container>
  );
}