import { useState, useEffect } from 'react';
import { Service, ServiceCategory } from '../types';
import servicesData from '../data/services.json';

function mapJsonToService(jsonService: any): Service {
    return {
        ...jsonService,
        category: jsonService.category as ServiceCategory,
        createdAt: new Date(jsonService.createdAt),
        updatedAt: new Date(jsonService.updatedAt),
        lastUpdated: new Date(jsonService.lastUpdated || jsonService.updatedAt),
        officeHours: jsonService.officeHours ? {
            ...jsonService.officeHours,
            saturday: jsonService.officeHours.saturday || undefined,
            sunday: jsonService.officeHours.sunday || undefined,
            lunchBreak: jsonService.officeHours.lunchBreak || undefined,
        } : undefined,
        location: jsonService.location || undefined,
        contact: jsonService.contact || undefined,
        processingTime: jsonService.processingTime || undefined,
        fees: jsonService.fees || [],
        steps: jsonService.steps || [],
        relatedServices: jsonService.relatedServices || [],
        updatedBy: jsonService.updatedBy || undefined,
    } as Service;
}

export function useServiceDetail(id: string) {
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        try {
            setLoading(true);

            const servicesArray = Array.isArray(servicesData)
                ? servicesData
                : servicesData.services || [];

            const foundService = servicesArray.find((s: any) => s.id === id);

            if (!foundService) {
                throw new Error('Service not found');
            }

            const mappedService = mapJsonToService(foundService);
            setService(mappedService);
            setError(null);
        } catch (err) {
            setError(err as Error);
            setService(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    return { data: service, loading, error };
}