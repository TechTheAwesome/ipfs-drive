import React from "react";
import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { EditNotifications } from "@mui/icons-material";

export default function Setup() {

  return (
    <Container maxWidth="xs">
      <br/>
      <List>
        <ListItem>
          <ListItemButton component='a' href="/store" divider>
            <ListItemIcon>
              <EditNotifications/>
            </ListItemIcon>
            <ListItemText primary="Manage drives" secondary="" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component='a' href="/keys">
            <ListItemIcon>
              <EditNotifications/>
            </ListItemIcon>
            <ListItemText primary="Manage keys" secondary="hey~" />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
}