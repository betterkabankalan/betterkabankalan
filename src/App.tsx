import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";

function useAnalytics() {
  useEffect(() => {
    const id = "bk-analytics";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.src = "https://web-analytics-tan.vercel.app/track.js";
    script.async = true;
    script.setAttribute("data-site-id", "better-kabankalan");
    document.body.appendChild(script);
  }, []);
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
