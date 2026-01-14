import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Preloader from "./components/Preloader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen  bg-white">
      {loading && <Preloader />}
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
