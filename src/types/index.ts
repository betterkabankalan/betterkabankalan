/**
 * Core type definitions for BetterKabankalan
 * All types are exported from this central location
 */

// ==================== Enums ====================

export enum ServiceCategory {
    GOVERNMENT = 'government',
    HEALTH = 'health',
    EMERGENCY = 'emergency',
    BUSINESS = 'business',
    EDUCATION = 'education',
    SOCIAL_SERVICES = 'social_services',
    INFRASTRUCTURE = 'infrastructure'
}

export enum DocumentStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    RELEASED = 'released'
}

export enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
}

// ==================== Base Interfaces ====================

export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Address {
    street?: string;
    barangay: string;
    city: string;
    province: string;
    region: string;
    zipCode?: string;
}

export interface ContactInformation {
    phone?: string;
    mobile?: string;
    email?: string;
    fax?: string;
    website?: string;
}

// ==================== Service Types ====================

export interface Service extends BaseEntity {
    title: string;
    description: string;
    category: ServiceCategory;
    requirements: Requirement[];
    location?: Location;
    contact?: ContactInformation;
    processingTime?: string;
    fees?: Fee[];
    steps?: ProcessStep[];
    officeHours?: OfficeHours;
    isActive: boolean;
    tags: string[];
    relatedServices?: string[];
    lastUpdated: Date;
    updatedBy?: string;
}

export interface Requirement {
    id: string;
    name: string;
    description?: string;
    isMandatory: boolean;
    documentType?: string;
    examples?: string[];
}

export interface Fee {
    id: string;
    name: string;
    amount: number;
    description?: string;
    isVariable: boolean;
    formula?: string;
}

export interface ProcessStep {
    stepNumber: number;
    title: string;
    description: string;
    estimatedTime?: string;
    responsibleOffice?: string;
}

export interface OfficeHours {
    weekdays: TimeRange;
    saturday?: TimeRange;
    sunday?: TimeRange;
    lunchBreak?: TimeRange;
    holidays: boolean;
}

export interface TimeRange {
    open: string;
    close: string;
}

// ==================== Location Types ====================

export interface Location {
    id: string;
    name: string;
    address: Address;
    coordinates?: Coordinates;
    landmark?: string;
    floor?: string;
    room?: string;
}

export interface Barangay extends BaseEntity {
    name: string;
    code: string;
    population?: number;
    area?: number;
    captain?: Official;
    contact?: ContactInformation;
    coordinates?: Coordinates;
    description?: string;
    facilities?: Facility[];
    isPoblacion: boolean;
}

export interface Facility {
    id: string;
    name: string;
    type: FacilityType;
    address: Address;
    contact?: ContactInformation;
    services: string[];
    isOperational: boolean;
}

export enum FacilityType {
    HEALTH_CENTER = 'health_center',
    SCHOOL = 'school',
    POLICE_STATION = 'police_station',
    FIRE_STATION = 'fire_station',
    MARKET = 'market',
    GYMNASIUM = 'gymnasium',
    PARK = 'park',
    LIBRARY = 'library'
}

// ==================== Official Types ====================

export interface Official extends BaseEntity {
    firstName: string;
    lastName: string;
    middleName?: string;
    position: string;
    office: string;
    department?: string;
    contact?: ContactInformation;
    photo?: string;
    bio?: string;
    termStart: Date;
    termEnd?: Date;
    isActive: boolean;
}

// ==================== Emergency Types ====================

export interface EmergencyHotline extends BaseEntity {
    name: string;
    category: EmergencyCategory;
    primaryNumber: string;
    alternateNumbers?: string[];
    description: string;
    availability: string;
    coverage: string[];
    priority: Priority;
    isActive: boolean;
}

export enum EmergencyCategory {
    POLICE = 'police',
    FIRE = 'fire',
    MEDICAL = 'medical',
    RESCUE = 'rescue',
    DISASTER = 'disaster',
    HOTLINE = 'hotline'
}

// ==================== News & Announcements ====================

export interface Announcement extends BaseEntity {
    title: string;
    content: string;
    summary: string;
    category: AnnouncementCategory;
    priority: Priority;
    publishDate: Date;
    expiryDate?: Date;
    author: string;
    office: string;
    attachments?: Attachment[];
    images?: string[];
    isPublished: boolean;
    isPinned: boolean;
    views: number;
    tags: string[];
}

export enum AnnouncementCategory {
    GENERAL = 'general',
    HEALTH = 'health',
    EDUCATION = 'education',
    INFRASTRUCTURE = 'infrastructure',
    EMERGENCY = 'emergency',
    EVENT = 'event',
    POLICY = 'policy'
}

export interface Attachment {
    id: string;
    filename: string;
    url: string;
    fileType: string;
    fileSize: number;
    uploadedAt: Date;
}

// ==================== Transparency Types ====================

export interface BudgetItem extends BaseEntity {
    fiscalYear: number;
    department: string;
    category: string;
    description: string;
    allocatedAmount: number;
    spentAmount: number;
    remainingAmount: number;
    percentage: number;
    quarter?: number;
    lastUpdated: Date;
}

export interface Project extends BaseEntity {
    name: string;
    description: string;
    location: string;
    contractor?: string;
    budget: number;
    spent: number;
    status: ProjectStatus;
    progress: number;
    startDate: Date;
    expectedEndDate: Date;
    actualEndDate?: Date;
    department: string;
    category: string;
    updates: ProjectUpdate[];
    images?: string[];
}

export enum ProjectStatus {
    PLANNED = 'planned',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
    DELAYED = 'delayed',
    CANCELLED = 'cancelled',
    ON_HOLD = 'on_hold'
}

export interface ProjectUpdate {
    date: Date;
    description: string;
    progress: number;
    author: string;
    images?: string[];
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
    metadata?: ResponseMetadata;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: Date;
}

export interface ResponseMetadata {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
    timestamp: Date;
}

export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// ==================== Search Types ====================

export interface SearchParams {
    query: string;
    category?: ServiceCategory;
    filters?: Record<string, any>;
    pagination?: PaginationParams;
}

export interface SearchResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

// ==================== Weather Types ====================

export interface WeatherData {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    timestamp: Date;
}

export interface WeatherForecast {
    date: Date;
    maxTemp: number;
    minTemp: number;
    precipitation: number;
    description: string;
    icon: string;
}

// ==================== Form Types ====================

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'file' | 'date';
    placeholder?: string;
    required: boolean;
    validation?: ValidationRule[];
    options?: SelectOption[];
}

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface ValidationRule {
    type: 'required' | 'email' | 'min' | 'max' | 'pattern' | 'custom';
    value?: any;
    message: string;
}

// ==================== Statistics Types ====================

export interface CityStatistics {
    population: number;
    area: number;
    density: number;
    barangays: number;
    households: number;
    literacyRate?: number;
    employmentRate?: number;
    povertyRate?: number;
    lastUpdated: Date;
}

export interface ServiceStatistics {
    totalServices: number;
    activeServices: number;
    averageProcessingTime: string;
    totalApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
    pendingApplications: number;
}

// ==================== User Types (for future authentication) ====================

export interface User extends BaseEntity {
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber?: string;
    address?: Address;
    role: UserRole;
    isVerified: boolean;
    isActive: boolean;
    lastLogin?: Date;
}

export enum UserRole {
    CITIZEN = 'citizen',
    ADMIN = 'admin',
    STAFF = 'staff',
    SUPER_ADMIN = 'super_admin'
}