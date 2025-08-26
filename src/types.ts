// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Project interface
export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    name?: string;
    description?: string;
    technologies?: string;
    project_url?: string;
    github_url?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    project_type?: {
      key: string;
      value: string;
    };
    featured?: boolean;
  };
}

// Skill interface
export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    name?: string;
    category?: {
      key: string;
      value: string;
    };
    proficiency?: {
      key: string;
      value: string;
    };
    years_experience?: number;
  };
}

// Work Experience interface
export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    job_title?: string;
    company_name?: string;
    company_website?: string;
    start_date?: string;
    end_date?: string;
    current_job?: boolean;
    description?: string;
    achievements?: string;
    technologies?: string;
    company_logo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Testimonial interface
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    name?: string;
    title?: string;
    company?: string;
    quote?: string;
    relationship?: {
      key: string;
      value: string;
    };
    photo?: {
      url: string;
      imgix_url: string;
    };
    rating?: number;
    featured?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isProject(obj: CosmicObject): obj is Project {
  return obj.type === 'projects';
}

export function isSkill(obj: CosmicObject): obj is Skill {
  return obj.type === 'skills';
}

export function isWorkExperience(obj: CosmicObject): obj is WorkExperience {
  return obj.type === 'work-experience';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

// Utility types
export type SkillCategory = 'languages' | 'frameworks' | 'tools' | 'databases' | 'design';
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type ProjectType = 'web-app' | 'mobile-app' | 'website' | 'api' | 'other';
export type RelationshipType = 'client' | 'colleague' | 'manager' | 'collaborator';