import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { NetWorthView } from 'ui';
import { useClientContext } from '../contexts/ClientContext';

const GetClient = gql`
  query GetClient($clientId: ID!) {
    client(clientId: $clientId) {
      id
      cashBalance
      investmentTotal
    }
  }
`;

export function NetWorthContainer() {
  const { clientId } = useClientContext();
  const { loading, error, data } = useQuery(GetClient, {
    variables: {
      clientId,
    },
    skip: clientId === null,
  });

  if (loading) return null;
  if (error) return null;

  return data.client ? (
    <NetWorthView
      cashBalance={data.client.cashBalance}
      investmentTotal={data.client.investmentTotal}
    />
  ) : null;
}
