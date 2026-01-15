/**
 * Custom React hooks for BetterKabankalan
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
    Service,
    Barangay,
    Announcement,
    EmergencyHotline,
    WeatherData,
    WeatherForecast,
    ApiResponse
} from '../types';
import {
    servicesApi,
    barangaysApi,
    announcementsApi,
    emergencyApi
} from '../services/dataService';
import { weatherApi } from '../services/api';
import { CACHE_DURATION } from '../constants';
import { getStorageItem, setStorageItem } from '../utils/formatters';

// ==================== Generic Fetch Hook ====================

interface UseFetchOptions<T> {
    initialData?: T;
    fetchOnMount?: boolean;
    cacheKey?: string;
    cacheDuration?: number;
}

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useFetch<T>(
    fetchFn: () => Promise<ApiResponse<T>>,
    options: UseFetchOptions<T> = {}
): UseFetchResult<T> {
    const {
        initialData = null,
        fetchOnMount = true,
        cacheKey,
        cacheDuration = CACHE_DURATION.MEDIUM
    } = options;

    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        // Check cache first
        if (cacheKey) {
            const cached = getStorageItem<{ data: T; timestamp: number } | null>(cacheKey, null);
            if (cached && cached.data && Date.now() - cached.timestamp < cacheDuration) {
                setData(cached.data);
                return;
            }
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetchFn();

            if (response.success && response.data) {
                setData(response.data);

                // Cache the result
                if (cacheKey) {
                    setStorageItem(cacheKey, {
                        data: response.data,
                        timestamp: Date.now()
                    });
                }
            } else {
                throw new Error(response.error?.message || 'Failed to fetch data');
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    }, [fetchFn, cacheKey, cacheDuration]);

    useEffect(() => {
        if (fetchOnMount) {
            fetch();
        }
    }, [fetch, fetchOnMount]);

    return { data, loading, error, refetch: fetch };
}

// ==================== Services Hooks ====================

export function useServices(category?: string) {
    return useFetch<Service[]>(
        () => servicesApi.getAll(category ? { category } : undefined),
        {
            fetchOnMount: true,
            cacheKey: category ? `services_${category}` : 'services_all',
            cacheDuration: CACHE_DURATION.LONG
        }
    );
}

export function useService(id: string) {
    return useFetch<Service>(
        () => servicesApi.getById(id),
        {
            fetchOnMount: !!id,
            cacheKey: `service_${id}`,
            cacheDuration: CACHE_DURATION.LONG
        }
    );
}

export function useFeaturedServices() {
    return useFetch<Service[]>(
        () => servicesApi.getFeatured(),
        {
            fetchOnMount: true,
            cacheKey: 'services_featured',
            cacheDuration: CACHE_DURATION.MEDIUM
        }
    );
}

// ==================== Barangay Hooks ====================

export function useBarangays() {
    return useFetch<Barangay[]>(
        () => barangaysApi.getAll(),
        {
            fetchOnMount: true,
            cacheKey: 'barangays',
            cacheDuration: CACHE_DURATION.LONG
        }
    );
}

export function useBarangay(id: string) {
    return useFetch<Barangay>(
        () => barangaysApi.getById(id),
        {
            fetchOnMount: !!id,
            cacheKey: `barangay_${id}`,
            cacheDuration: CACHE_DURATION.LONG
        }
    );
}

// ==================== Announcements Hooks ====================

export function useAnnouncements(page: number = 1, limit: number = 10) {
    return useFetch(
        () => announcementsApi.getAll({ page, limit }),
        {
            fetchOnMount: true,
            cacheKey: `announcements_${page}_${limit}`,
            cacheDuration: CACHE_DURATION.SHORT
        }
    );
}

export function useAnnouncement(id: string) {
    return useFetch<Announcement>(
        () => announcementsApi.getById(id),
        {
            fetchOnMount: !!id,
            cacheKey: `announcement_${id}`,
            cacheDuration: CACHE_DURATION.MEDIUM
        }
    );
}

export function useRecentAnnouncements(limit: number = 5) {
    return useFetch<Announcement[]>(
        () => announcementsApi.getRecent(limit),
        {
            fetchOnMount: true,
            cacheKey: `announcements_recent_${limit}`,
            cacheDuration: CACHE_DURATION.SHORT
        }
    );
}

// ==================== Emergency Hooks ====================

export function useEmergencyHotlines() {
    return useFetch<EmergencyHotline[]>(
        () => emergencyApi.getAll(),
        {
            fetchOnMount: true,
            cacheKey: 'emergency_hotlines',
            cacheDuration: CACHE_DURATION.LONG
        }
    );
}

// ==================== Weather Hook ====================

export function useWeather() {
    const [current, setCurrent] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<WeatherForecast[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchWeather = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [currentData, forecastData] = await Promise.all([
                weatherApi.getCurrent(),
                weatherApi.getForecast(7)
            ]);

            setCurrent(currentData);
            setForecast(forecastData);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch weather'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWeather();

        // Refresh every 30 minutes
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, [fetchWeather]);

    return { current, forecast, loading, error, refetch: fetchWeather };
}

// ==================== Debounce Hook ====================

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// ==================== Local Storage Hook ====================

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    };

    return [storedValue, setValue];
}

// ==================== Media Query Hook ====================

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
}

// ==================== Click Outside Hook ====================

export function useClickOutside<T extends HTMLElement = HTMLElement>(
    callback: () => void
): React.RefObject<T | null> {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [callback]);

    return ref;
}

// ==================== Window Size Hook ====================

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

// ==================== Scroll Position Hook ====================

export function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
}

// ==================== Intersection Observer Hook ====================

export function useIntersectionObserver(
    ref: React.RefObject<Element>,
    options: IntersectionObserverInit = {}
): boolean {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [ref, options]);

    return isIntersecting;
}

// ==================== Previous Value Hook ====================

export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

// ==================== Toggle Hook ====================

export function useToggle(initialValue: boolean = false): [boolean, () => void] {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(v => !v);
    }, []);

    return [value, toggle];
}

// ==================== Async Hook ====================

export function useAsync<T>(
    asyncFunction: () => Promise<T>,
    immediate: boolean = true
) {
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(async () => {
        setStatus('pending');
        setData(null);
        setError(null);

        try {
            const response = await asyncFunction();
            setData(response);
            setStatus('success');
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
            setStatus('error');
        }
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, status, data, error };
}