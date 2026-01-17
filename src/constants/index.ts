
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
    'Barangay 1 (Poblacion)',
    'Barangay 2 (Poblacion)',
    'Barangay 3 (Poblacion)',
    'Barangay 4 (Poblacion)',
    'Barangay 5 (Poblacion)',
    'Barangay 6 (Poblacion)',
    'Barangay 7 (Poblacion)',
    'Barangay 8 (Poblacion)',
    'Barangay 9 (Poblacion)',
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
    'Salong',
    'Tabugon',
    'Tagoc',
    'Tagukon',
    'Talubangi',
    'Tampalon',
    'Tan-awan',
    'Tapi',
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


export const BARANGAY_DETAILS = [
    {
        id: "brgy-001",
        name: "Barangay 1 (Poblacion)",
        lat: 10.002232411505684,
        lng: 122.81674861105866,
        population: 5200,
        households: 1100,
        classification: "urban" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-002",
        name: "Barangay 2 (Poblacion)",
        lat: 9.995568460305492,
        lng: 122.81109991685514,
        population: 5200,
        households: 1100,
        classification: "urban" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-003",
        name: "Barangay 3 (Poblacion)",
        lat: 9.993362141639198,
        lng: 122.81145613898506,
        population: 5200,
        households: 1100,
        classification: "urban" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-004",
        name: "Barangay 4 (Poblacion)",
        lat: 9.99157724635844,
        lng: 122.81634163005734,
        population: 5200,
        households: 1100,
        classification: "urban" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-005",
        name: "Barangay 5 (Poblacion)",
        lat: 9.994111916221636,
        lng: 122.80909308173509,
        population: 5200,
        households: 1100,
        classification: "urban" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-006",
        name: "Barangay 6 (Poblacion)",
        lat: 9.990085270433884,
        lng: 122.80841602346405,
        population: 5200,
        households: 1100,
        classification: "urban" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-007",
        name: "Barangay 7 (Poblacion)",
        lat: 9.987577297052638,
        lng: 122.81200328488188,
        population: 5200,
        households: 1100,
        classification: "urban" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-008",
        name: "Barangay 8 (Poblacion)",
        lat: 9.987767549980513,
        lng: 122.81438539577512,
        population: 5200,
        households: 1100,
        classification: "urban" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-009",
        name: "Barangay 9 (Poblacion)",
        lat: 9.986062225940437,
        lng: 122.81533986024846,
        population: 5200,
        households: 1100,
        classification: "urban" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-bantayan",
        name: "Barangay Bantayan",
        lat: 9.73553988763163,
        lng: 122.79676894694035,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-Binicuil",
        name: "Barangay Binicuil",
        lat: 10.021797571027419,
        lng: 122.82418779918092,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-Camansi",
        name: "Barangay Camansi",
        lat: 9.933132485712681,
        lng: 122.80256941065956,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-Camingawan",
        name: "Barangay Camingawan",
        lat: 9.841299119878128,
        lng: 122.8854765000538,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-camugao",
        name: "Barangay Camugao",
        lat: 9.984022925032487,
        lng: 122.80587702720514,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-carol-an",
        name: "Barangay Carol-An",
        lat: 9.895330330631765,
        lng: 122.93287992444282,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-daan-banua",
        name: "Barangay Daan Banua",
        lat: 10.048579450581412,
        lng: 122.81323834425443,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-hilamonan",
        name: "Barangay Hilamonan",
        lat: 10.002207121871859,
        lng: 122.84168987888185,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-inapoy",
        name: "Barangay Inapoy",
        lat: 9.806523567666462,
        lng: 122.86367784283202,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-linao",
        name: "Barangay Linao",
        lat: 9.983071950898431,
        lng: 122.79111414885092,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-magballo",
        name: "Barangay Magballo",
        lat: 9.756195387792674,
        lng: 122.68937817834107,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-oringao",
        name: "Barangay Oringao",
        lat: 9.902103344985761,
        lng: 122.86677075857692,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-orong",
        name: "Barangay Orong",
        lat: 9.949863865079498,
        lng: 122.83513198951033,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-pinaguinpinan",
        name: "Barangay Pinaguinpinan",
        lat: 9.769456113337503,
        lng: 122.84128931427445,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-salong",
        name: "Barangay Salong",
        lat: 9.927045256597916,
        lng: 122.76961042991054,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-tabugon",
        name: "Barangay Tabugon",
        lat: 9.78742955474086,
        lng: 122.8027800172025,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-tagoc",
        name: "Barangay Tagoc",
        lat: 9.81388813260285,
        lng: 122.83519335564795,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-tagukon",
        name: "Barangay Tagukon",
        lat: 9.835844373136686,
        lng: 122.90260401407951,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-talubangi",
        name: "Barangay Talubangi",
        lat: 10.003434853213491,
        lng: 122.80588440474523,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-tampalon",
        name: "Barangay Tampalon",
        lat: 9.87117144199224,
        lng: 22.79529610844172,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-tan-awan",
        name: "Barangay Tan-Awan",
        lat: 9.956509518690204,
        lng: 122.90883220252057,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
    {
        id: "brgy-tapi",
        name: "Barangay Tapi",
        lat: 9.834796918077434,
        lng: 122.77375565408143,
        population: 5200,
        households: 1100,
        classification: "rural" as const,
        phone: "(034) 471-XXXX",
        captain: "Juan Dela Cruz",
        address: "Poblacion, Kabankalan City, Negros Occidental"
    },
] as const;