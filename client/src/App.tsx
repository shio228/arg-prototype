import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import StoryPage from "./pages/StoryPage";
import SuccessPage from "./pages/SuccessPage";
import HiddenPage from "./pages/HiddenPage";
import FailurePage from "./pages/FailurePage";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Sitemap from "./pages/Sitemap";
import CipherPage from "./pages/CipherPage";
import ClearPage from "./pages/ClearPage";
import article from "./pages/article";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/article/:id"} component={article} />
      <Route path={"/story/:id"} component={StoryPage} />
      <Route path={"/success/:id"} component={SuccessPage} />
      <Route path={"/hidden/:id"} component={HiddenPage} />
      <Route path={"/failure"} component={FailurePage} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/sitemap"} component={Sitemap} />
      <Route path={"/cipher"} component={CipherPage} />
      <Route path={"/clear"} component={ClearPage} />
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
            <Header />
            <Router />
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
