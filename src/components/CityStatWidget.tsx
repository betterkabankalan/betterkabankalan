import { Users, Home, Building2, MapPin } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  description?: string;
}

export default function CityStatsWidget() {
  const stats: Stat[] = [
    {
      label: "Population",
      value: "200,198",
      icon: <Users className="h-5 w-5" />,
      color: "blue",
      description: "2020 Census",
    },
    {
      label: "Barangays",
      value: "32",
      icon: <Home className="h-5 w-5" />,
      color: "green",
      description: "Administrative divisions",
    },
    {
      label: "Land Area",
      value: "697.35 km²",
      icon: <MapPin className="h-5 w-5" />,
      color: "purple",
      description: "Total area",
    },
    {
      label: "Businesses",
      value: "2,500+",
      icon: <Building2 className="h-5 w-5" />,
      color: "orange",
      description: "Registered",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> =
      {
        blue: {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-100",
        },
        green: {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-100",
        },
        purple: {
          bg: "bg-purple-50",
          text: "text-purple-700",
          border: "border-purple-100",
        },
        orange: {
          bg: "bg-orange-50",
          text: "text-orange-700",
          border: "border-orange-100",
        },
      };
    return colors[color] || colors.blue;
  };

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-blue-900">Kabankalan City</h3>
        <p className="text-sm text-blue-900/70">Quick Facts</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const colors = getColorClasses(stat.color);

          return (
            <div
              key={index}
              className={`p-4 rounded-xl border ${colors.border} ${colors.bg}`}
            >
              <div className={`${colors.text} mb-2`}>{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-gray-700">
                {stat.label}
              </p>
              {stat.description && (
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-blue-100">
        <div className="text-xs text-blue-900/70 space-y-1">
          <p>📍 Province: Negros Occidental</p>
          <p>📊 Data source: PSA, LGU records</p>
        </div>
      </div>
    </div>
  );
}
