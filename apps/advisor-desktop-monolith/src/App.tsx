import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Header } from 'ui';
import { Sidebar } from './components/Sidebar';

export function App() {
  return (
    <React.Fragment>
      <Header title="Advisor Desktop" />
      <Sidebar />
      <Container maxWidth="xl">
        <Box sx={{ my: 2 }}>Home</Box>
      </Container>
    </React.Fragment>
  );
}
