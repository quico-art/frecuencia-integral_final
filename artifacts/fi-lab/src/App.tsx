import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Academy from "@/pages/Academy";
import Landing from "@/pages/Landing";
import Metodo from "@/pages/Metodo";
import Deportista from "@/pages/Deportista";
import Libros from "@/pages/Libros";
import Login from "@/pages/Login";
import Area from "@/pages/Area";
import Privacidad from "@/pages/Privacidad";
import AvisoLegal from "@/pages/AvisoLegal";
import Cookies from "@/pages/Cookies";
import Lab from "@/pages/Lab";
import { EditorSidebar } from "@/components/EditorSidebar";
import CookieBanner from "@/components/CookieBanner";
import { SectionStyleApplier } from "@/components/SectionStyleApplier";
import { BlockStyleApplier } from "@/components/BlockStyleApplier";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Academy} />
        <Route path="/metodo" component={Landing} />
        <Route path="/metodo-tct" component={Metodo} />
        <Route path="/deportista" component={Deportista} />
        <Route path="/libros" component={Libros} />
        <Route path="/login" component={Login} />
        <Route path="/area" component={Area} />
        <Route path="/privacidad" component={Privacidad} />
        <Route path="/aviso-legal" component={AvisoLegal} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/lab" component={Lab} />
        <Route component={NotFound} />
      </Switch>
      <SectionStyleApplier />
      <BlockStyleApplier />
      <EditorSidebar />
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
