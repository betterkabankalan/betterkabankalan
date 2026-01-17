/**
 * Clean Weather Widget - Minimalist Design
 * Black text only, simple and clean
 */

import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun } from "lucide-react";

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

export default function CleanWeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const KABANKALAN_LAT = 9.9892;
  const KABANKALAN_LON = 122.8122;

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  async function fetchWeather() {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${KABANKALAN_LAT}&longitude=${KABANKALAN_LON}&current=temperature_2m,weather_code&timezone=Asia/Manila`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.current) {
        const weatherCode = data.current.weather_code;

        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          description: getWeatherDescription(weatherCode),
          icon: getWeatherIcon(weatherCode),
        });
      }

      setLoading(false);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setLoading(false);
    }
  }

  function getWeatherDescription(code: number): string {
    if (code === 0 || code === 1) return "Clear";
    if (code === 2 || code === 3) return "Cloudy";
    if (code >= 51 && code <= 65) return "Rainy";
    if (code >= 80 && code <= 82) return "Rainy";
    if (code >= 95) return "Storm";
    return "Cloudy";
  }

  function getWeatherIcon(code: number): string {
    if (code === 0 || code === 1) return "sun";
    if (code === 2 || code === 3) return "cloud";
    if (code >= 51 && code <= 82) return "rain";
    if (code >= 95) return "storm";
    return "cloud";
  }

  const WeatherIcon = () => {
    if (!weather) return <Cloud className="h-4 w-4 text-gray-700" />;

    switch (weather.icon) {
      case "sun":
        return <Sun className="h-4 w-4 text-gray-700" />;
      case "rain":
        return <CloudRain className="h-4 w-4 text-gray-700" />;
      default:
        return <Cloud className="h-4 w-4 text-gray-700" />;
    }
  };

  if (loading || !weather) {
    return (
      <div className="flex items-center gap-2 px-3 py-1">
        <div className="h-3 w-3 animate-pulse rounded-full bg-gray-300" />
        <span className="text-xs text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <WeatherIcon />
      <span className="text-sm font-semibold text-gray-900">
        {weather.temperature}°C
      </span>
      <span className="text-xs text-gray-500 hidden sm:inline">
        {weather.description}
      </span>
    </div>
  );
}
