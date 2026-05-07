import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useRoute } from "wouter";

import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import MainFooter from "./components/MainFooter";
import ArticleFooter from "./components/ArticleFooter";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import ArticleSearch from "./pages/ArticleSearch";
import Article from "./pages/article";
import About from "./pages/About";
import { use } from "react";


function Router() {
  return (
    <Switch>
      
      <Route path={"/article/:id"} component={Article} />
      <Route path={"/rules"} component={Rules} />
      <Route path={"/about"} component={About} />
      <Route path={"/articleSearch"} component={ArticleSearch} />
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function ConditionalHeader() {
  const [isHome] = useRoute('/');
  const [isNotFound] = useRoute('/404');
  if (isHome || isNotFound) return null;
  return <Header />;
}

function ConditionalFooter() {
  const [isHome] = useRoute('/');
  const [isNotFound] = useRoute('/404');
  const [isArticle] = useRoute('/article/:id');
  if (isHome || isNotFound) return null;
  if (isArticle) return <ArticleFooter />;
  return <MainFooter />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <ConditionalHeader />
            <main className="flex-1">
              <Router />
            </main>
            <ConditionalFooter />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
