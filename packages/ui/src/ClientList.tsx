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
}

export function ClientList({ clients }: ClientListProps) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {clients.map((client) => {
        const labelId = `checkbox-list-secondary-label-${client}`;
        return (
          <ListItem key={client.id} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={client.name} src={client.photo} />
              </ListItemAvatar>
              <ListItemText primary={client.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
