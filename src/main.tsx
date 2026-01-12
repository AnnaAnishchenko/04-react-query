import { createRoot } from "react-dom/client";

import "modern-normalize/modern-normalize.css";
import "./index.css";
import App from "./components/App/App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
