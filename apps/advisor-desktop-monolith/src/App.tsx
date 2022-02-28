import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Header } from 'ui';
import { AccountsContainer } from './components/AccountsContainer';
import { InsightsContainer } from './components/InsightsContainer';
import { NetWorthContainer } from './components/NetWorthContainer';
import { ProfileContainer } from './components/ProfileContainer';
import { Sidebar } from './components/Sidebar';
import { useClientContext } from './contexts/ClientContext';

export function App() {
  const { clientId } = useClientContext();
  const isClientSelected = clientId && clientId.length >= 0;

  return (
    <Box sx={{ display: 'flex' }}>
      <Header title="Advisor Desktop" />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {!isClientSelected && (
          <Typography variant="h5" component="h1">
            Please select a client
          </Typography>
        )}
        {isClientSelected && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ height: '100%' }}>
                <ProfileContainer />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ height: '100%' }}>
                <NetWorthContainer />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ height: '100%' }}>Asset Allocation</Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ height: '100%' }}>Goals</Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ height: '100%' }}>
                <AccountsContainer />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ height: '100%' }}>
                <InsightsContainer />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
