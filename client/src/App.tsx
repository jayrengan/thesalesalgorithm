import { Switch, Route, Router } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ReelsPublicPage from "@/pages/reels-public";
import PodcastsPublicPage from "@/pages/podcasts-public";
import BookPage from "@/pages/book";
import AboutPage from "@/pages/about";
import GalleryPage from "@/pages/gallery";
import { useEffect } from "react";

// Base path for GitHub Pages subdirectory hosting.
// Remove this (set to "") when connecting a custom domain.
const BASE = "/thesalesalgorithm";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center gap-2 p-3 border-b border-border h-14">
            <SidebarTrigger />
            <span className="text-sm font-semibold text-muted-foreground">The Sales Algorithm with JK</span>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function WithLayout({ component: Component }: { component: () => JSX.Element | null }) {
  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/">{() => <WithLayout component={BookPage} />}</Route>
      <Route path="/home" component={Home} />
      <Route path="/reels">{() => <WithLayout component={ReelsPublicPage} />}</Route>
      <Route path="/podcasts">{() => <WithLayout component={PodcastsPublicPage} />}</Route>
      <Route path="/about">{() => <WithLayout component={AboutPage} />}</Route>
      <Route path="/book">{() => <WithLayout component={BookPage} />}</Route>
      <Route path="/gallery">{() => <WithLayout component={GalleryPage} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <Router base={BASE}>
      <TooltipProvider>
        <AppRouter />
      </TooltipProvider>
    </Router>
  );
}

export default App;
