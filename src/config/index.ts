const isViteEnv = typeof import.meta !== 'undefined' &&
    (import.meta as any).env !== undefined;

const getEnv = (key: string, defaultValue: string = ''): string => {
    if (!isViteEnv) return defaultValue;

    const env = (import.meta as any).env as Record<string, any>;
    return env[key] || defaultValue;
};

const isDev = (): boolean => {
    if (!isViteEnv) return true;
    const env = (import.meta as any).env as Record<string, any>;
    return env.DEV ?? true;
};

const isProd = (): boolean => {
    if (!isViteEnv) return false;
    const env = (import.meta as any).env as Record<string, any>;
    return env.PROD ?? false;
};

export const config = {
    app: {
        name: 'BetterKabankalan',
        version: '1.0.0',
        description: 'Community-driven portal for Kabankalan City',
        url: 'https://betterkabankalan.vercel.app',
        repository: 'https://github.com/betterkabankalan/betterkabankalan'
    },

    api: {

        baseUrl: getEnv('VITE_API_URL', ''),
        timeout: 30000,
    },
    external: {
        weather: {
            url: 'https://api.open-meteo.com/v1/forecast',
            enabled: true
        },

        holidays: {
            url: 'https://date.nager.at/api/v3/PublicHolidays',
            country: 'PH',
            enabled: true
        },

        weatherApiKey: getEnv('VITE_WEATHER_API_KEY', ''),
    },

    features: {
        weather: true,
        search: true,
        announcements: true,
        transparency: true,
        darkMode: false,
    },

    analytics: {
        googleAnalyticsId: getEnv('VITE_GA_ID', ''),
        enabled: false
    },

    sentry: {
        dsn: getEnv('VITE_SENTRY_DSN', ''),
        enabled: false
    },

    dev: {
        isDevelopment: isDev(),
        isProduction: isProd(),
        enableDebugLogs: getEnv('VITE_DEBUG', 'false') === 'true'
    }
} as const;

export default config;