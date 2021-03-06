import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { ClientList } from 'ui';
import { useClientContext } from '../contexts/ClientContext';

const drawerWidth = 240;

const GetClients = gql`
  query GetClients {
    clients {
      id
      name
      photo
    }
  }
`;

export function Sidebar() {
  const { loading, error, data } = useQuery(GetClients);
  const { clientId, setClientId } = useClientContext();

  if (loading) return null;
  if (error) return null;

  const handleClientClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClientId(e.currentTarget.id);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <ClientList
          clients={data.clients}
          selectedClientId={clientId}
          onClick={handleClientClick}
        />
      </Box>
    </Drawer>
  );
}
