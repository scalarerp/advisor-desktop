import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Header } from 'ui';

export function App() {
  return (
    <React.Fragment>
      <Header title="Advisor Desktop" />
      <Container maxWidth="xl">
        <Box sx={{ my: 2 }}>Home</Box>
      </Container>
    </React.Fragment>
  );
}
