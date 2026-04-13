import { Switch, Route, Router, useLocation } from "wouter";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import LandingPage from "@/pages/landing";
import AboutPage from "@/pages/about";
import PodcastsPage from "@/pages/podcasts-public";
import GalleryPage from "@/pages/gallery";
import ShortsPage from "@/pages/shorts";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function App() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <SiteNav />
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/book" component={LandingPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/podcasts" component={PodcastsPage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/shorts" component={ShortsPage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
