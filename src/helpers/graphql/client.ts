import { ApolloClient, InMemoryCache } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const cache = new InMemoryCache();
persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
}).then(() => {});

export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache,
});
