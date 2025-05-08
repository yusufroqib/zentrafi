import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://api.goldsky.com/api/public/project_cm9y2l8nhz87901v63uba80gv/subgraphs/zentra-pool-factory/1.0.0/gn',
  cache: new InMemoryCache(),
});
