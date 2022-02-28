import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createApolloClient } from 'graphql-utils';
import { setChartOptions, theme } from 'ui';
import { App } from './App';
import { ClientContextProvider } from './contexts/ClientContext';

// Initialize charts
setChartOptions();

// Create Apollo Client
const apolloClient = createApolloClient(import.meta.env.VITE_API_URL);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ClientContextProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ClientContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
