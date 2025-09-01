import React from "react";
import { toast } from "sonner";
import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 2,
        fetcher: (resource: RequestInfo, init?: RequestInit) =>
          fetch(resource, init).then((res) => res.json()),
        onError: (error, key) => {
          // Log to monitoring service
          console.error(`SWR error at ${key}:`, error);
          toast.error("An error occurred while fetching data.");
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
