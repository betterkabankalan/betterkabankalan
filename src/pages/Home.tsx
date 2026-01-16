import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Preloader from "../components/Preloader";
import Footer from "../components/Footer";
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      {loading && <Preloader />}
      <Hero />
      <Services />
    </>
  );
}
