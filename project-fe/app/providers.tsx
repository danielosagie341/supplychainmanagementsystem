"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/app/get-query-client";
import type * as React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          {children}
          <Toaster position="top-right" />
        </Provider>
      </PersistGate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
