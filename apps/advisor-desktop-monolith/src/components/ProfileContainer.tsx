import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ClientProfile } from 'ui';
import { useClientContext } from '../contexts/ClientContext';

const GetClient = gql`
  query GetClient($clientId: ID!) {
    client(clientId: $clientId) {
      id
      photo
      name
      email
      phone
      dob
      retirementAge
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

  return data.client ? <ClientProfile client={data.client} /> : null;
}
