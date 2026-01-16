
import { useEffect, useState } from "react";

interface CurrencyRate {
  code: string;
  symbol: string;
  phpRate: number;
  flag: string;
}

export default function MultiCurrencyWidgetSmooth() {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    fetchRates();
    const fetchInterval = setInterval(fetchRates, 30 * 60 * 1000);
    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    if (rates.length === 0) return;

    const rotateInterval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rates.length);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 400);
    }, 4000);

    return () => clearInterval(rotateInterval);
  }, [rates.length]);

  async function fetchRates() {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();

      if (data.rates && data.rates.PHP) {
        const phpPerUsd = data.rates.PHP;

        const currencies: CurrencyRate[] = [
          {
            code: "USD",
            symbol: "$",
            phpRate: phpPerUsd,
            flag: "🇺🇸",
          },
          {
            code: "EUR",
            symbol: "€",
            phpRate: phpPerUsd / data.rates.EUR,
            flag: "🇪🇺",
          },
          {
            code: "GBP",
            symbol: "£",
            phpRate: phpPerUsd / data.rates.GBP,
            flag: "🇬🇧",
          },
          {
            code: "JPY",
            symbol: "¥",
            phpRate: phpPerUsd / data.rates.JPY,
            flag: "🇯🇵",
          },
          {
            code: "AUD",
            symbol: "A$",
            phpRate: phpPerUsd / data.rates.AUD,
            flag: "🇦🇺",
          },
          {
            code: "CAD",
            symbol: "C$",
            phpRate: phpPerUsd / data.rates.CAD,
            flag: "🇨🇦",
          },
          {
            code: "SGD",
            symbol: "S$",
            phpRate: phpPerUsd / data.rates.SGD,
            flag: "🇸🇬",
          },
          {
            code: "HKD",
            symbol: "HK$",
            phpRate: phpPerUsd / data.rates.HKD,
            flag: "🇭🇰",
          },
          {
            code: "CNY",
            symbol: "¥",
            phpRate: phpPerUsd / data.rates.CNY,
            flag: "🇨🇳",
          },
          {
            code: "KRW",
            symbol: "₩",
            phpRate: phpPerUsd / data.rates.KRW,
            flag: "🇰🇷",
          },
        ];

        setRates(currencies);
      }

      setLoading(false);
    } catch (err) {
      console.error("Currency fetch error:", err);
      setLoading(false);
    }
  }

  if (loading || rates.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-1">
        <div className="h-3 w-3 animate-pulse rounded-full bg-gray-300" />
        <span className="text-xs text-gray-500">Loading rates...</span>
      </div>
    );
  }

  const currentCurrency = rates[currentIndex];

  return (
    <div className="relative flex items-center gap-2 px-3 py-1 overflow-hidden min-w-[200px]">
      <div
        className="flex items-center gap-2 transition-all duration-500 ease-in-out"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateY(-8px)" : "translateY(0)",
        }}
      >
        <span className="text-base">{currentCurrency.flag}</span>

        <span className="text-xs font-medium text-gray-700">
          {currentCurrency.code}
        </span>

        <span className="text-xs text-gray-500">
          {currentCurrency.symbol}1 =
        </span>
        <span className="text-sm font-semibold text-gray-900">
          ₱{currentCurrency.phpRate.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
