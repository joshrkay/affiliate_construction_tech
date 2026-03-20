import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CompareBar } from "./components/CompareBar";
import { ReviewModal } from "./components/modals/ReviewModal";
import { SubmitToolModal } from "./components/modals/SubmitToolModal";
import { AppProvider } from "./context/AppContext";

function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f1f5f9" }}>
      {/* Global Organization Schema for AI engines */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BUILTECH",
          "url": "https://bestconstructionapps.com",
          "description": "The construction industry's AI & software directory. Compare ratings, read contractor reviews, and discover AI tools for every trade.",
          "sameAs": [],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "url": "https://bestconstructionapps.com"
          }
        })}
      </script>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CompareBar />
      <ReviewModal />
      <SubmitToolModal />
    </div>
  );
}

export function Root() {
  return (
    <AppProvider>
      <RootLayout />
    </AppProvider>
  );
}
