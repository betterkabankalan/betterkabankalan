/// <reference types="vite/client" />


declare global {
    interface ImportMetaEnv {
        readonly VITE_API_URL?: string;
        readonly VITE_WEATHER_API_KEY?: string;
        readonly VITE_GA_ID?: string;
        readonly VITE_SENTRY_DSN?: string;
        readonly VITE_DEBUG?: string;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}

export { };