import React from "react";
import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { EditNotifications } from "@mui/icons-material";

export default function Setup() {
  return (
    <Container maxWidth="xs">
      <br/>
      <List>
        <ListItem>
          <ListItemButton onClick={() => console.log('hi')} divider>
            <ListItemIcon>
              <EditNotifications/>
            </ListItemIcon>
            <ListItemText primary="Create a new drive" secondary="psst, this will use the key you set or will generate a random key!" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <EditNotifications/>
            </ListItemIcon>
            <ListItemText primary="Edit Drive" secondary="hey~" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <EditNotifications/>
            </ListItemIcon>
            <ListItemText primary="Edit Drive" secondary="hey~" />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
}