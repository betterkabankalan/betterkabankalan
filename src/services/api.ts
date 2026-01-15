import {
    Service,
    Barangay,
    Announcement,
    EmergencyHotline,
    WeatherData,
    WeatherForecast,
    ApiResponse,
    SearchParams,
    SearchResult,
    BudgetItem,
    Project
} from '../types'
import { API_CONFIG, EXTERNAL_APIS, KABANKALAN_COORDINATES } from '../constants';


class ApiClient {
    private baseURL: string;
    private timeout: number;

    constructor(baseURL: string, timeout: number = 30000) {
        this.baseURL = baseURL;
        this.timeout = timeout;
    }

    private async request<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return {
                success: true,
                data,
                metadata: {
                    timestamp: new Date()
                }
            };
        } catch (error) {
            clearTimeout(timeoutId);
            console.error('API request failed:', error);

            return {
                success: false,
                error: {
                    code: 'API_ERROR',
                    message: error instanceof Error ? error.message : 'Unknown error',
                    timestamp: new Date()
                }
            };
        }
    }

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
        const queryString = params ? this.buildQueryString(params) : '';
        return this.request<T>(`${endpoint}${queryString}`);
    }

    async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }

    private buildQueryString(params: Record<string, any>): string {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        });
        const queryString = searchParams.toString();
        return queryString ? `?${queryString}` : '';
    }
}

const apiClient = new ApiClient(API_CONFIG.baseURL, API_CONFIG.timeout);

// ==================== Service APIs ====================

export const servicesApi = {
    /**
     * Get all services
     */
    async getAll(params?: { category?: string }): Promise<ApiResponse<Service[]>> {
        return apiClient.get<Service[]>('/services', params);
    },

    /**
     * Get service by ID
     */
    async getById(id: string): Promise<ApiResponse<Service>> {
        return apiClient.get<Service>(`/services/${id}`);
    },

    /**
     * Search services
     */
    async search(params: SearchParams): Promise<ApiResponse<SearchResult<Service>>> {
        return apiClient.get<SearchResult<Service>>('/services/search', params);
    },

    /**
     * Get featured services
     */
    async getFeatured(): Promise<ApiResponse<Service[]>> {
        return apiClient.get<Service[]>('/services/featured');
    }
};

// ==================== Barangay APIs ====================

export const barangaysApi = {
    /**
     * Get all barangays
     */
    async getAll(): Promise<ApiResponse<Barangay[]>> {
        return apiClient.get<Barangay[]>('/barangays');
    },

    /**
     * Get barangay by ID
     */
    async getById(id: string): Promise<ApiResponse<Barangay>> {
        return apiClient.get<Barangay>(`/barangays/${id}`);
    },

    /**
     * Search barangays
     */
    async search(query: string): Promise<ApiResponse<Barangay[]>> {
        return apiClient.get<Barangay[]>('/barangays/search', { q: query });
    }
};

// ==================== Announcements APIs ====================

export const announcementsApi = {
    /**
     * Get all announcements
     */
    async getAll(params?: {
        page?: number;
        limit?: number;
        category?: string;
    }): Promise<ApiResponse<SearchResult<Announcement>>> {
        return apiClient.get<SearchResult<Announcement>>('/announcements', params);
    },

    /**
     * Get announcement by ID
     */
    async getById(id: string): Promise<ApiResponse<Announcement>> {
        return apiClient.get<Announcement>(`/announcements/${id}`);
    },

    /**
     * Get pinned announcements
     */
    async getPinned(): Promise<ApiResponse<Announcement[]>> {
        return apiClient.get<Announcement[]>('/announcements/pinned');
    },

    /**
     * Get recent announcements
     */
    async getRecent(limit: number = 5): Promise<ApiResponse<Announcement[]>> {
        return apiClient.get<Announcement[]>('/announcements/recent', { limit });
    }
};

// ==================== Emergency APIs ====================

export const emergencyApi = {
    /**
     * Get all emergency hotlines
     */
    async getAll(): Promise<ApiResponse<EmergencyHotline[]>> {
        return apiClient.get<EmergencyHotline[]>('/emergency/hotlines');
    },

    /**
     * Get hotlines by category
     */
    async getByCategory(category: string): Promise<ApiResponse<EmergencyHotline[]>> {
        return apiClient.get<EmergencyHotline[]>('/emergency/hotlines', { category });
    }
};

// ==================== Transparency APIs ====================

export const transparencyApi = {
    /**
     * Get budget data
     */
    async getBudget(year?: number): Promise<ApiResponse<BudgetItem[]>> {
        return apiClient.get<BudgetItem[]>('/transparency/budget', { year });
    },

    /**
     * Get projects
     */
    async getProjects(params?: {
        status?: string;
        year?: number;
    }): Promise<ApiResponse<Project[]>> {
        return apiClient.get<Project[]>('/transparency/projects', params);
    },

    /**
     * Get project by ID
     */
    async getProjectById(id: string): Promise<ApiResponse<Project>> {
        return apiClient.get<Project>(`/transparency/projects/${id}`);
    }
};

// ==================== Weather API ====================

export const weatherApi = {
    /**
     * Get current weather for Kabankalan
     */
    async getCurrent(): Promise<WeatherData | null> {
        try {
            const { latitude, longitude } = KABANKALAN_COORDINATES;
            const params = new URLSearchParams({
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                current_weather: 'true',
                timezone: 'Asia/Manila'
            });

            const response = await fetch(
                `${EXTERNAL_APIS.weather.url}?${params.toString()}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();

            return {
                temperature: data.current_weather.temperature,
                feelsLike: data.current_weather.temperature, // Approximate
                humidity: 0, // Not available in free tier
                windSpeed: data.current_weather.windspeed,
                description: this.getWeatherDescription(data.current_weather.weathercode),
                icon: this.getWeatherIcon(data.current_weather.weathercode),
                timestamp: new Date()
            };
        } catch (error) {
            console.error('Error fetching weather:', error);
            return null;
        }
    },

    /**
     * Get weather forecast
     */
    async getForecast(days: number = 7): Promise<WeatherForecast[]> {
        try {
            const { latitude, longitude } = KABANKALAN_COORDINATES;
            const params = new URLSearchParams({
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode',
                timezone: 'Asia/Manila',
                forecast_days: days.toString()
            });

            const response = await fetch(
                `${EXTERNAL_APIS.weather.url}?${params.toString()}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch forecast data');
            }

            const data = await response.json();

            return data.daily.time.map((date: string, index: number) => ({
                date: new Date(date),
                maxTemp: data.daily.temperature_2m_max[index],
                minTemp: data.daily.temperature_2m_min[index],
                precipitation: data.daily.precipitation_sum[index],
                description: this.getWeatherDescription(data.daily.weathercode[index]),
                icon: this.getWeatherIcon(data.daily.weathercode[index])
            }));
        } catch (error) {
            console.error('Error fetching forecast:', error);
            return [];
        }
    },

    /**
     * Get weather description from code
     */
    getWeatherDescription(code: number): string {
        const descriptions: Record<number, string> = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Slight snow fall',
            73: 'Moderate snow fall',
            75: 'Heavy snow fall',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };
        return descriptions[code] || 'Unknown';
    },

    /**
     * Get weather icon from code
     */
    getWeatherIcon(code: number): string {
        if (code === 0) return '☀️';
        if (code <= 3) return '⛅';
        if (code <= 48) return '🌫️';
        if (code <= 67) return '🌧️';
        if (code <= 77) return '❄️';
        if (code <= 82) return '🌦️';
        if (code <= 86) return '🌨️';
        return '⛈️';
    }
};

// ==================== Search API ====================

export const searchApi = {
    /**
     * Global search across all content
     */
    async search(query: string): Promise<ApiResponse<any>> {
        return apiClient.get('/search', { q: query });
    }
};

// ==================== Contact API ====================

export const contactApi = {
    /**
     * Submit contact form
     */
    async submit(data: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }): Promise<ApiResponse<any>> {
        return apiClient.post('/contact', data);
    }
};

// Export all APIs
export default {
    services: servicesApi,
    barangays: barangaysApi,
    announcements: announcementsApi,
    emergency: emergencyApi,
    transparency: transparencyApi,
    weather: weatherApi,
    search: searchApi,
    contact: contactApi
};