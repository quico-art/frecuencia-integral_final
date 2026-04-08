import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Demo from "@/pages/Demo";
import { EditorSidebar } from "@/components/EditorSidebar";
import { SectionStyleApplier } from "@/components/SectionStyleApplier";
import { BlockStyleApplier } from "@/components/BlockStyleApplier";
import { activateAdmin } from "@/lib/auth";

const queryClient = new QueryClient();

function AdminActivator() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminKey = params.get("admin");
    if (adminKey) {
      const ok = activateAdmin(adminKey);
      if (ok) {
        const url = new URL(window.location.href);
        url.searchParams.delete("admin");
        window.history.replaceState({}, "", url.toString());
        window.location.reload();
      }
    }
  }, []);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/demo" component={Demo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AdminActivator />
          <SectionStyleApplier />
          <BlockStyleApplier />
          <Router />
          <EditorSidebar />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
