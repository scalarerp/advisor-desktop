import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import { Header } from 'ui';
import { ProfileContainer } from './components/ProfileContainer';
import { Sidebar } from './components/Sidebar';

export function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header title="Advisor Desktop" />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Net Worth
          </Grid>
          <Grid item xs={6}>
            Asset Allocation
          </Grid>
          <Grid item xs={6}>
            Goals
          </Grid>
          <Grid item xs={6}>
            <ProfileContainer />
          </Grid>
          <Grid item xs={6}>
            Insights
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
