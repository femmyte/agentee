"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQuery = ({ children }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: "always",
        refetchOnReconnect: "always",
        retry: 3,
        staleTime: 60 * 5 * 1000, //equal to 5mins
      },
    },
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default ReactQuery;
