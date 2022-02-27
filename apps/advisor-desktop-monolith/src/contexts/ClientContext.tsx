import React, { useContext, useState } from 'react';

// ---------- ClientContext ----------
type ClientIdSetter = (clientId: string) => void;

/** ClientContext contains refreshCount and RefreshCountSetter */
const ClientContext = React.createContext<
  { clientId: string; setClientId: ClientIdSetter } | undefined
>(undefined);

// ---------- ClientContextProvider ----------
const ClientContextProvider: React.FC = ({ children }) => {
  const [clientId, setClientId] = useState<string>('');

  const value = { clientId, setClientId };
  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

// ---------- useClientContext ----------
function useClientContext() {
  const clientContext = useContext(ClientContext);
  /* istanbul ignore next */
  if (clientContext === undefined) {
    throw new Error(
      'useClientContext must be used within a ClientContextProvider'
    );
  }
  return clientContext;
}

export { ClientContextProvider, useClientContext };
