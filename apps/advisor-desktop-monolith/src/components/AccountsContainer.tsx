import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ClientAccounts } from 'ui';
import { useClientContext } from '../contexts/ClientContext';

const GetAccounts = gql`
  query GetAccounts($clientId: ID!) {
    accounts(clientId: $clientId) {
      id
      name
      accountNumber
    }
  }
`;

export function AccountsContainer() {
  const { clientId } = useClientContext();
  const { loading, error, data } = useQuery(GetAccounts, {
    variables: {
      clientId,
    },
    skip: clientId === null,
  });

  if (loading) return null;
  if (error) return null;

  const handleAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(`Account ${e.currentTarget.id}`);
  };

  return (
    <ClientAccounts accounts={data.accounts} onClick={handleAccountClick} />
  );
}
