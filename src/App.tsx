import { useEffect } from "react";
import { useLocation  } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";


function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const SCRIPT_SRC  = "https://web-analytics-tan.vercel.app/track.js";
    const SCRIPT_ID   = "bk-analytics";

    if (document.getElementById(SCRIPT_ID)) return; 

    const script = document.createElement("script");
    script.id    = SCRIPT_ID;
    script.src   = SCRIPT_SRC;
    script.async = true;
    script.setAttribute("data-site-id", "better-kabankalan");
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typeof (window as any).trackPageView === "function") {
        (window as any).trackPageView(location.pathname + location.search);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname, location.search]);
}


export default function App() {
  useAnalytics();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
      </main>
    </div>
  );
}