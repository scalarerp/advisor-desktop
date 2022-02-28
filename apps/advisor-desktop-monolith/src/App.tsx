import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Header } from 'ui';
import { AssetAllocationChartContainer } from './components/AssetAllocationChartContainer';
import { AccountsContainer } from './components/AccountsContainer';
import { InsightsContainer } from './components/InsightsContainer';
import { NetWorthContainer } from './components/NetWorthContainer';
import { PerformanceChartContainer } from './components/PerformanceChartContainer';
import { ProfileContainer } from './components/ProfileContainer';
import { Sidebar } from './components/Sidebar';
import { useClientContext } from './contexts/ClientContext';

const boxShadow =
  '0px 11px 4px rgba(0, 0, 0, 0.01), 0px 6px 4px rgba(0, 0, 0, 0.05), 0px 3px 3px rgba(0, 0, 0, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.09), 0px 0px 0px rgba(0, 0, 0, 0.1)';

const border = '1px solid #F0F0F0';

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
            <Grid item xs={6}>
              <Box sx={{ height: '100%', boxShadow, border }}>
                <ProfileContainer />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ height: '100%', boxShadow, border }}>
                <NetWorthContainer />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 388, boxShadow, border }}>
                <AssetAllocationChartContainer />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 388, boxShadow, border }}>
                <PerformanceChartContainer />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', boxShadow, border }}>
                <AccountsContainer />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', boxShadow, border }}>
                <InsightsContainer />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
