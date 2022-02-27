import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import { useClientContext } from '../contexts/ClientContext';

const GetClient = gql`
  query GetClient($clientId: ID!) {
    client(clientId: $clientId) {
      id
      name
      photo
    }
  }
`;

export function ProfileContainer() {
  const { clientId } = useClientContext();
  const { loading, error, data } = useQuery(GetClient, {
    variables: {
      clientId,
    },
    skip: clientId === null,
  });

  if (loading) return null;
  if (error) return null;
  if (data.client === null) return null;

  const { name } = data.client;

  return <Box>{name}</Box>;
}
