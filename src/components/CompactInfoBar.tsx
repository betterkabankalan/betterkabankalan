/**
 * Compact Info Bar - Multi-Widget Version
 * Shows weather, currency, and next holiday in a single slim bar
 */

import { useEffect, useState } from "react";
import { Sun, Cloud, CloudRain, DollarSign, Calendar } from "lucide-react";

interface InfoData {
  weather: {
    temp: number;
    icon: string;
  } | null;
  usdRate: number | null;
  nextHoliday: {
    name: string;
    days: number;
  } | null;
}

export default function CompactInfoBar() {
  const [data, setData] = useState<InfoData>({
    weather: null,
    usdRate: null,
    nextHoliday: null,
  });

  useEffect(() => {
    fetchWeather();
    fetchCurrency();
    loadNextHoliday();

    const weatherInterval = setInterval(fetchWeather, 10 * 60 * 1000);
    const currencyInterval = setInterval(fetchCurrency, 30 * 60 * 1000);

    return () => {
      clearInterval(weatherInterval);
      clearInterval(currencyInterval);
    };
  }, []);

  async function fetchWeather() {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=9.9892&longitude=122.8122&current=temperature_2m,weather_code&timezone=Asia/Manila`;
      const response = await fetch(url);
      const result = await response.json();

      if (result.current) {
        const weatherCode = result.current.weather_code;
        const icon =
          weatherCode <= 1 ? "sun" : weatherCode <= 3 ? "cloud" : "rain";

        setData((prev) => ({
          ...prev,
          weather: {
            temp: Math.round(result.current.temperature_2m),
            icon,
          },
        }));
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
    }
  }

  async function fetchCurrency() {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/PHP"
      );
      const result = await response.json();

      if (result.rates) {
        setData((prev) => ({
          ...prev,
          usdRate: 1 / result.rates.USD,
        }));
      }
    } catch (err) {
      console.error("Currency fetch error:", err);
    }
  }

  function loadNextHoliday() {
    const today = new Date();
    const holidays = [
      { date: new Date(2025, 1, 25), name: "EDSA Day" },
      { date: new Date(2025, 3, 9), name: "Araw ng Kagitingan" },
      { date: new Date(2025, 3, 17), name: "Maundy Thursday" },
      { date: new Date(2025, 4, 1), name: "Labor Day" },
      { date: new Date(2025, 5, 12), name: "Independence Day" },
    ];

    const upcoming = holidays
      .filter((h) => h.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

    if (upcoming) {
      const days = Math.ceil(
        (upcoming.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      setData((prev) => ({
        ...prev,
        nextHoliday: {
          name: upcoming.name,
          days,
        },
      }));
    }
  }

  const WeatherIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
      case "sun":
        return <Sun className="h-4 w-4 text-yellow-500" />;
      case "rain":
        return <CloudRain className="h-4 w-4 text-blue-600" />;
      default:
        return <Cloud className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100">
      {/* Weather */}
      {data.weather && (
        <div className="flex items-center gap-1.5">
          <WeatherIcon icon={data.weather.icon} />
          <span className="text-sm font-semibold text-blue-900">
            {data.weather.temp}°C
          </span>
        </div>
      )}

      {/* Divider */}
      {data.weather && data.usdRate && <div className="h-4 w-px bg-blue-200" />}

      {data.usdRate && (
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-4 w-4 text-green-700" />
          <span className="text-xs text-green-900/60">$1 =</span>
          <span className="text-sm font-semibold text-green-900">
            ₱{(1 / data.usdRate).toFixed(0)}
          </span>
        </div>
      )}

      {/* Divider */}
      {data.usdRate && data.nextHoliday && (
        <div className="h-4 w-px bg-blue-200 hidden lg:block" />
      )}

      {/* Next Holiday */}
      {data.nextHoliday && (
        <div className="hidden lg:flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-purple-700" />
          <span className="text-xs text-purple-900/80">
            {data.nextHoliday.name} in {data.nextHoliday.days}d
          </span>
        </div>
      )}
    </div>
  );
}
