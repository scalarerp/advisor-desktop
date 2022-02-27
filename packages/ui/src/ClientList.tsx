import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Client } from 'advisor-models';

interface ClientListProps {
  clients: Array<Client>;
  selectedClientId: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function ClientList({
  clients,
  selectedClientId,
  onClick,
}: ClientListProps) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {clients.map((client) => {
        const { id, name, photo } = client;
        return (
          <ListItem key={id} disablePadding>
            <ListItemButton
              id={id}
              selected={selectedClientId === id}
              onClick={onClick}
            >
              <ListItemAvatar>
                <Avatar alt={name} src={photo} />
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
