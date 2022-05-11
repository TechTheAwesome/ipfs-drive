import React from 'react'
import { MFSEntry } from 'ipfs-core-types/src/files'
import { Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Folder } from '@mui/icons-material';

type StoreListProps = {
  isInitialized: boolean,
  entry: MFSEntry,
}

export default function StoreListItem({ isInitialized, entry}: StoreListProps ) {

  return <ListItem >
    <ListItemIcon>
      <Folder />
    </ListItemIcon>
    <ListItemText primary={entry.name} secondary={isInitialized ? "drive initialized" : "drive not initialized"} />
    <List>
      {(() => {
        if(!isInitialized) 
          return <Button variant= 'contained' onClick={() => {
                    
          }}> Init Folder</Button>

        return <>
          <Button variant='contained' >Change Key</Button>
          <span>  </span>
          <Button variant='contained' component='a' href={`/drive/#/${entry.name}`}>Open Drive</Button>
        </>
      })()}
    </List>
  </ListItem>
}
