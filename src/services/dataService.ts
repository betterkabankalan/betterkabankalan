import {
    Service,
    Barangay,
    Announcement,
    EmergencyHotline,
    ApiResponse,
    SearchParams,
    SearchResult
} from '../types';

import servicesData from '../data/services.json';
import barangaysData from '../data/barangays.json';
import emergencyData from '../data/emergency.json';
import announcementsData from '../data/announcement.json';

function getDataArray<T>(data: any, key: string): T[] {
    if (Array.isArray(data)) {
        return data as T[];
    }
    if (data && typeof data === 'object' && key in data && Array.isArray(data[key])) {
        return data[key] as T[];
    }
    return [];
}

function createSuccessResponse<T>(data: T): ApiResponse<T> {
    return {
        success: true,
        data,
        metadata: {
            timestamp: new Date()
        }
    };
}

function createErrorResponse(message: string): ApiResponse<any> {
    return {
        success: false,
        error: {
            code: 'DATA_ERROR',
            message,
            timestamp: new Date()
        }
    };
}

const simulateDelay = (ms: number = 100) =>
    new Promise(resolve => setTimeout(resolve, ms));


export const servicesApi = {

    async getAll(params?: { category?: string }): Promise<ApiResponse<Service[]>> {
        await simulateDelay();

        try {
            let services = getDataArray<Service>(servicesData, 'services');

            if (params?.category) {
                services = services.filter(s => s.category === params.category);
            }

            return createSuccessResponse(services);
        } catch (error) {
            return createErrorResponse('Failed to load services');
        }
    },

    async getById(id: string): Promise<ApiResponse<Service>> {
        await simulateDelay();

        try {
            const services = getDataArray<Service>(servicesData, 'services');
            const service = services.find(s => s.id === id);

            if (!service) {
                return createErrorResponse(`Service with id ${id} not found`);
            }

            return createSuccessResponse(service);
        } catch (error) {
            return createErrorResponse('Failed to load service');
        }
    },

    async search(params: SearchParams): Promise<ApiResponse<SearchResult<Service>>> {
        await simulateDelay();

        try {
            let services = getDataArray<Service>(servicesData, 'services');

            if (params.query) {
                const query = params.query.toLowerCase();
                services = services.filter(s =>
                    s.title.toLowerCase().includes(query) ||
                    s.description.toLowerCase().includes(query) ||
                    s.tags.some(tag => tag.toLowerCase().includes(query))
                );
            }

            if (params.category) {
                services = services.filter(s => s.category === params.category);
            }

            const page = params.pagination?.page || 1;
            const limit = params.pagination?.limit || 10;
            const start = (page - 1) * limit;
            const end = start + limit;

            const paginatedServices = services.slice(start, end);

            return createSuccessResponse({
                items: paginatedServices,
                total: services.length,
                page,
                limit,
                hasMore: end < services.length
            });
        } catch (error) {
            return createErrorResponse('Failed to search services');
        }
    },

    async getFeatured(): Promise<ApiResponse<Service[]>> {
        await simulateDelay();

        try {
            const services = getDataArray<Service>(servicesData, 'services');
            // Return first 3 services as featured
            const featured = services.slice(0, 3);
            return createSuccessResponse(featured);
        } catch (error) {
            return createErrorResponse('Failed to load featured services');
        }
    }
};


export const barangaysApi = {
    async getAll(): Promise<ApiResponse<Barangay[]>> {
        await simulateDelay();

        try {
            const barangays = getDataArray<Barangay>(barangaysData, 'barangays');
            return createSuccessResponse(barangays);
        } catch (error) {
            return createErrorResponse('Failed to load barangays');
        }
    },

    async getById(id: string): Promise<ApiResponse<Barangay>> {
        await simulateDelay();

        try {
            const barangays = getDataArray<Barangay>(barangaysData, 'barangays');
            const barangay = barangays.find(b => b.id === id);

            if (!barangay) {
                return createErrorResponse(`Barangay with id ${id} not found`);
            }

            return createSuccessResponse(barangay);
        } catch (error) {
            return createErrorResponse('Failed to load barangay');
        }
    },

    async search(query: string): Promise<ApiResponse<Barangay[]>> {
        await simulateDelay();

        try {
            const allBarangays = getDataArray<Barangay>(barangaysData, 'barangays');
            const searchQuery = query.toLowerCase();
            const barangays = allBarangays.filter(b =>
                b.name.toLowerCase().includes(searchQuery)
            );

            return createSuccessResponse(barangays);
        } catch (error) {
            return createErrorResponse('Failed to search barangays');
        }
    }
};


export const announcementsApi = {
    async getAll(params?: {
        page?: number;
        limit?: number;
        category?: string;
    }): Promise<ApiResponse<SearchResult<Announcement>>> {
        await simulateDelay();

        try {
            let announcements = getDataArray<Announcement>(announcementsData, 'announcements');

            if (params?.category) {
                announcements = announcements.filter(a => a.category === params.category);
            }

            announcements.sort((a, b) =>
                new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
            );

            const page = params?.page || 1;
            const limit = params?.limit || 10;
            const start = (page - 1) * limit;
            const end = start + limit;

            const paginatedAnnouncements = announcements.slice(start, end);

            return createSuccessResponse({
                items: paginatedAnnouncements,
                total: announcements.length,
                page,
                limit,
                hasMore: end < announcements.length
            });
        } catch (error) {
            return createErrorResponse('Failed to load announcements');
        }
    },

    async getById(id: string): Promise<ApiResponse<Announcement>> {
        await simulateDelay();

        try {
            const announcements = getDataArray<Announcement>(announcementsData, 'announcements');
            const announcement = announcements.find(a => a.id === id);

            if (!announcement) {
                return createErrorResponse(`Announcement with id ${id} not found`);
            }

            return createSuccessResponse(announcement);
        } catch (error) {
            return createErrorResponse('Failed to load announcement');
        }
    },

    async getPinned(): Promise<ApiResponse<Announcement[]>> {
        await simulateDelay();

        try {
            const announcements = getDataArray<Announcement>(announcementsData, 'announcements');
            const pinned = announcements
                .filter(a => a.isPinned)
                .sort((a, b) =>
                    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
                );

            return createSuccessResponse(pinned);
        } catch (error) {
            return createErrorResponse('Failed to load pinned announcements');
        }
    },

    async getRecent(limit: number = 5): Promise<ApiResponse<Announcement[]>> {
        await simulateDelay();

        try {
            const announcements = getDataArray<Announcement>(announcementsData, 'announcements');
            const recent = announcements
                .sort((a, b) =>
                    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
                )
                .slice(0, limit);

            return createSuccessResponse(recent);
        } catch (error) {
            return createErrorResponse('Failed to load recent announcements');
        }
    }
};

export const emergencyApi = {

    async getAll(): Promise<ApiResponse<EmergencyHotline[]>> {
        await simulateDelay();

        try {
            const hotlines = getDataArray<EmergencyHotline>(emergencyData, 'hotlines');
            return createSuccessResponse(hotlines);
        } catch (error) {
            return createErrorResponse('Failed to load emergency hotlines');
        }
    },

    async getByCategory(category: string): Promise<ApiResponse<EmergencyHotline[]>> {
        await simulateDelay();

        try {
            const allHotlines = getDataArray<EmergencyHotline>(emergencyData, 'hotlines');
            const hotlines = allHotlines.filter(h => h.category === category);
            return createSuccessResponse(hotlines);
        } catch (error) {
            return createErrorResponse('Failed to load emergency hotlines');
        }
    }
};

export default {
    services: servicesApi,
    barangays: barangaysApi,
    announcements: announcementsApi,
    emergency: emergencyApi
};