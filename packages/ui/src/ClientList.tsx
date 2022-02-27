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
        const labelId = `checkbox-list-secondary-label-${client}`;
        return (
          <ListItem key={client.id} disablePadding>
            <ListItemButton
              id={client.id}
              selected={selectedClientId === client.id}
              onClick={onClick}
            >
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
