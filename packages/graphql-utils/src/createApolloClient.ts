import { ApolloClient, InMemoryCache } from '@apollo/client';

export function createApolloClient(apiUrl: string) {
  return new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        // Executes queries against both the cache and the GraphQL server.
        // The query automatically updates if the result of the server-side
        // query modifies the cached fields.
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  });
}
