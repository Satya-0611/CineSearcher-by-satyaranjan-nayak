import { QueryCache, QueryClient } from "react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 3_600_000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
});

export default queryClient;
