
import { ServiceCategory, EmergencyCategory } from '../types';
import config from '../config';


export const APP_CONFIG = {
    name: 'BetterKabankalan',
    version: '1.0.0',
    description: 'Citizen-first portal for Kabankalan City',
    tagline: 'Transparency • Services • Community',
    city: 'Kabankalan City',
    province: 'Negros Occidental',
    region: 'Western Visayas',
    contact: {
        phone: '(034) 471-2291',
        email: 'info@kabankalan.gov.ph',
        address: 'City Hall, Kabankalan City, Negros Occidental'
    }
} as const;

export const KABANKALAN_COORDINATES = {
    latitude: 9.98,
    longitude: 122.82,
    zoom: 12
} as const;

export const BARANGAYS = [
    'Bantayan',
    'Binicuil',
    'Camansi',
    'Camingawan',
    'Camugao',
    'Carol-an',
    'Daan Banua',
    'Hilamonan',
    'Inapoy',
    'Linao',
    'Locotan',
    'Magballo',
    'Oringao',
    'Orong',
    'Pinaguinpinan',
    'Barangay 1 (Poblacion)',
    'Barangay 2 (Poblacion)',
    'Barangay 3 (Poblacion)',
    'Barangay 4 (Poblacion)',
    'Barangay 5 (Poblacion)',
    'Barangay 6 (Poblacion)',
    'Barangay 7 (Poblacion)',
    'Barangay 8 (Poblacion)',
    'Barangay 9 (Poblacion)',
    'North Poblacion',
    'Salong',
    'Tabugon',
    'Tagoc',
    'Talubangi',
    'Tan-awan',
    'Tapi',
    'Tortosa'
] as const;

export const CITY_STATS = {
    population: 210893,
    area: 697.35,
    barangayCount: 32,
    density: 302,
    households: 45000,
    zipCode: '6111'
} as const;


export const SERVICE_CATEGORY_CONFIG = {
    [ServiceCategory.GOVERNMENT]: {
        label: 'Government Services',
        color: 'blue',
        icon: 'Building2',
        description: 'Official government documents and services'
    },
    [ServiceCategory.HEALTH]: {
        label: 'Health Services',
        color: 'red',
        icon: 'Heart',
        description: 'Medical and health-related services'
    },
    [ServiceCategory.EMERGENCY]: {
        label: 'Emergency',
        color: 'orange',
        icon: 'Phone',
        description: '24/7 emergency response services'
    },
    [ServiceCategory.BUSINESS]: {
        label: 'Business & Livelihood',
        color: 'green',
        icon: 'Briefcase',
        description: 'Business permits and economic services'
    },
    [ServiceCategory.EDUCATION]: {
        label: 'Education',
        color: 'purple',
        icon: 'GraduationCap',
        description: 'Schools and educational services'
    },
    [ServiceCategory.SOCIAL_SERVICES]: {
        label: 'Social Services',
        color: 'pink',
        icon: 'Users',
        description: 'Social welfare and community programs'
    },
    [ServiceCategory.INFRASTRUCTURE]: {
        label: 'Infrastructure',
        color: 'gray',
        icon: 'Hammer',
        description: 'Public works and infrastructure'
    }
} as const;


export const EMERGENCY_HOTLINES = [
    {
        name: 'Emergency Hotline',
        number: '911',
        category: EmergencyCategory.HOTLINE,
        description: 'National emergency hotline',
        availability: '24/7'
    },
    {
        name: 'Kabankalan PNP',
        number: '(034) 471-2024',
        category: EmergencyCategory.POLICE,
        description: 'Philippine National Police - Kabankalan',
        availability: '24/7'
    },
    {
        name: 'Bureau of Fire Protection',
        number: '(034) 471-2367',
        category: EmergencyCategory.FIRE,
        description: 'Fire emergency response',
        availability: '24/7'
    },
    {
        name: 'City Health Office',
        number: '(034) 471-2291',
        category: EmergencyCategory.MEDICAL,
        description: 'Medical emergencies and health concerns',
        availability: 'Office hours'
    },
    {
        name: 'MDRRMO',
        number: '(034) 471-xxxx',
        category: EmergencyCategory.DISASTER,
        description: 'Municipal Disaster Risk Reduction Management Office',
        availability: '24/7 during emergencies'
    },
    {
        name: 'Red Cross Kabankalan',
        number: '143',
        category: EmergencyCategory.MEDICAL,
        description: 'Red Cross emergency services',
        availability: '24/7'
    }
] as const;


export const DEFAULT_OFFICE_HOURS = {
    weekdays: {
        open: '08:00',
        close: '17:00'
    },
    lunchBreak: {
        open: '12:00',
        close: '13:00'
    },
    saturday: null,
    sunday: null,
    holidays: false
} as const;

export const COMMON_REQUIREMENTS = {
    VALID_ID: {
        name: 'Valid Government-Issued ID',
        examples: [
            'Philippine Passport',
            'Driver\'s License',
            'PhilHealth ID',
            'SSS/GSIS ID',
            'Voter\'s ID',
            'Postal ID',
            'PRC ID'
        ]
    },
    BARANGAY_CLEARANCE: {
        name: 'Barangay Clearance',
        description: 'Clearance from your barangay of residence'
    },
    CEDULA: {
        name: 'Community Tax Certificate (Cedula)',
        description: 'Annual community tax certificate'
    },
    PHOTOS: {
        name: '2x2 ID Photos',
        quantity: 2,
        description: 'Recent passport-sized photos'
    },
    PROOF_OF_RESIDENCY: {
        name: 'Proof of Residency',
        examples: [
            'Utility bills',
            'Lease contract',
            'Tax declaration'
        ]
    }
} as const;

export const API_CONFIG = {
    baseURL: config.api.baseUrl,
    timeout: config.api.timeout,

    retryAttempts: 3,
    retryDelay: 1000
} as const;

export const EXTERNAL_APIS = {
    weather: {
        url: 'https://api.open-meteo.com/v1/forecast',
        params: {
            latitude: KABANKALAN_COORDINATES.latitude,
            longitude: KABANKALAN_COORDINATES.longitude,
            timezone: 'Asia/Manila'
        }
    },
    holidays: {
        url: 'https://date.nager.at/api/v3/PublicHolidays',
        country: 'PH'
    }
} as const;


export const CACHE_KEYS = {
    SERVICES: 'services',
    BARANGAYS: 'barangays',
    ANNOUNCEMENTS: 'announcements',
    WEATHER: 'weather',
    STATISTICS: 'statistics'
} as const;

export const CACHE_DURATION = {
    SHORT: 5 * 60 * 1000,
    MEDIUM: 30 * 60 * 1000,
    LONG: 24 * 60 * 60 * 1000
} as const;


export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
} as const;


export const FILE_UPLOAD = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf']
} as const;


export const VALIDATION_PATTERNS = {
    EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    PHONE: /^(09|\+639)\d{9}$/,
    LANDLINE: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    ZIP_CODE: /^\d{4}$/
} as const;


export const ROUTES = {
    HOME: '/',
    SERVICES: '/services',
    SERVICE_DETAIL: '/services/:id',
    TRANSPARENCY: '/transparency',
    ANNOUNCEMENTS: '/announcements',
    ANNOUNCEMENT_DETAIL: '/announcements/:id',
    CONTACT: '/contact',
    ABOUT: '/about',
    SEARCH: '/search',
    BARANGAYS: '/barangays',
    BARANGAY_DETAIL: '/barangays/:id',
    EMERGENCY: '/emergency'
} as const;


export const SOCIAL_MEDIA = {
    facebook: 'https://facebook.com/kabankalancity',
    twitter: 'https://twitter.com/kabankalancity',
    instagram: 'https://instagram.com/kabankalancity'
} as const;


export const DEFAULT_META = {
    title: 'BetterKabankalan - Citizen-First Government Portal',
    description: 'Access city services, transparency data, and community information for Kabankalan City, Negros Occidental.',
    keywords: 'Kabankalan, government services, transparency, barangay, Negros Occidental',
    ogImage: '/og-image.png'
} as const;