import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import TherapistSearch from "@/components/TherapistSearch";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TherapistSearch />
      <Toaster />
    </QueryClientProvider>
  )
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  createRoot(rootEl).render(<App />);
});
