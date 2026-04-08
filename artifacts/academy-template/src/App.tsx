import { Switch, Route, Router as WouterRouter } from "wouter";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Area from "@/pages/Area";
import CourseLanding from "@/pages/CourseLanding";
import NotFound from "@/pages/NotFound";
import { ACADEMY } from "@/config";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/area" component={Area} />
      <Route path="/curso-1">{() => <CourseLanding courseKey="curso-1" />}</Route>
      <Route path="/curso-2">{() => <CourseLanding courseKey="curso-2" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('${ACADEMY.fonts.headingUrl}');
        @import url('${ACADEMY.fonts.bodyUrl}');
        :root {
          --color-primary: ${ACADEMY.colors.primary};
          --color-accent: ${ACADEMY.colors.accent};
          --color-accent-light: ${ACADEMY.colors.accentLight};
          --color-muted: ${ACADEMY.colors.muted};
          --color-light: ${ACADEMY.colors.light};
          --color-bg: ${ACADEMY.colors.background};
          --font-heading: ${ACADEMY.fonts.heading};
          --font-body: ${ACADEMY.fonts.body};
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--color-bg); color: var(--color-primary); font-family: var(--font-body); }
      `}</style>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </>
  );
}
