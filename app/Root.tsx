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
