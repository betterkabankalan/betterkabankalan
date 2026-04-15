import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Preloader from "../components/Preloader";
import BarangaysPage from "../components/BarangaysPage";
import { useSEO } from "../hooks";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useSEO({
    title: "BetterKabankalan — Citizen Portal for Kabankalan City",
    description: "Your citizen-first portal for Kabankalan City, Negros Occidental. Find government services, requirements, fees, barangay info, and city updates — all in one place.",
    canonical: "/",
  });

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
      <BarangaysPage />
    </>
  );
}
