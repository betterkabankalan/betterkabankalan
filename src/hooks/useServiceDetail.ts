import { useState, useEffect } from 'react';
import { Service, ServiceCategory } from '../types';
import servicesJson from '../data/services.json';

interface RawOfficeHours {
    weekdays: { open: string; close: string };
    saturday?: { open: string; close: string } | null;
    sunday?: { open: string; close: string } | null;
    lunchBreak?: { open: string; close: string } | null;
}

interface RawRequirement {
    id: string;
    name: string;
    description: string;
    isMandatory: boolean;
    documentType: string;
}

interface RawFee {
    id: string;
    name: string;
    amount: number;
    description: string;
    isVariable: boolean;
}

interface RawStep {
    id?: string;
    description: string;
    order?: number;
}

interface RawLocation {
    id: string;
    name: string;
    address?: {
        street?: string;
        barangay?: string;
        city?: string;
        province?: string;
        zipCode?: string;
    };
}

interface RawContact {
    phone?: string;
    email?: string;
}

interface RawService {
    id: string;
    title: string;
    category: string;
    description: string;
    requirements: RawRequirement[];
    fees: RawFee[];
    steps: RawStep[];
    location?: RawLocation | null;
    contact?: RawContact | null;
    officeHours?: RawOfficeHours | null;
    processingTime?: string | null;
    isActive: boolean;
    tags: string[];
    relatedServices: string[];
    updatedBy?: string | null;
    lastUpdated?: string | null;
    createdAt: string;
    updatedAt: string;
}


const servicesArray = servicesJson as RawService[];


function mapJsonToService(raw: RawService): Service {
    return {
        ...raw,
        category: raw.category as ServiceCategory,
        createdAt: new Date(raw.createdAt),
        updatedAt: new Date(raw.updatedAt),
        lastUpdated: new Date(raw.lastUpdated ?? raw.updatedAt),
        officeHours: raw.officeHours
            ? {
                ...raw.officeHours,
                saturday: raw.officeHours.saturday ?? undefined,
                sunday: raw.officeHours.sunday ?? undefined,
                lunchBreak: raw.officeHours.lunchBreak ?? undefined,
            }
            : undefined,
        location: raw.location ?? undefined,
        contact: raw.contact ?? undefined,
        processingTime: raw.processingTime ?? undefined,
        fees: raw.fees ?? [],
        steps: raw.steps ?? [],
        relatedServices: raw.relatedServices ?? [],
        updatedBy: raw.updatedBy ?? undefined,
    } as Service;
}


export function useServiceDetail(id: string) {
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        try {
            setLoading(true);

            const found = servicesArray.find((s) => s.id === id);

            if (!found) {
                throw new Error(`Service not found: ${id}`);
            }

            setService(mapJsonToService(found));
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setService(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    return { data: service, loading, error };
}