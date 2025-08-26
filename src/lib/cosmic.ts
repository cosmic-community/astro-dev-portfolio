import { createBucketClient } from '@cosmicjs/sdk'
import type { Project, Skill, WorkExperience, Testimonial } from '../types'

export const cosmic = createBucketClient({
  bucketSlug: import.meta.env.COSMIC_BUCKET_SLUG,
  readKey: import.meta.env.COSMIC_READ_KEY,
  writeKey: import.meta.env.COSMIC_WRITE_KEY,
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const projects = response.objects as Project[];
    
    // Sort by featured first, then by creation date
    return projects.sort((a, b) => {
      if (a.metadata?.featured && !b.metadata?.featured) return -1;
      if (!a.metadata?.featured && b.metadata?.featured) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch projects');
  }
}

// Fetch featured projects only
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.metadata?.featured === true);
}

// Fetch single project by slug
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'projects',
      slug
    }).depth(1);
    
    const project = response.object as Project;
    
    if (!project || !project.metadata) {
      return null;
    }
    
    return project;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch project');
  }
}

// Fetch all skills grouped by category
export async function getSkillsByCategory(): Promise<Record<string, Skill[]>> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const skills = response.objects as Skill[];
    
    // Group skills by category
    const grouped = skills.reduce((acc, skill) => {
      const category = skill.metadata?.category?.key || 'other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
    
    // Sort skills within each category by proficiency and years of experience
    Object.keys(grouped).forEach(category => {
      // FIXED: Add null check before calling sort to prevent TS2532 error
      const categorySkills = grouped[category];
      if (categorySkills && categorySkills.length > 0) {
        categorySkills.sort((a, b) => {
          const proficiencyOrder = { expert: 4, advanced: 3, intermediate: 2, beginner: 1 };
          const aProficiency = proficiencyOrder[a.metadata?.proficiency?.key as keyof typeof proficiencyOrder] || 0;
          const bProficiency = proficiencyOrder[b.metadata?.proficiency?.key as keyof typeof proficiencyOrder] || 0;
          
          if (aProficiency !== bProficiency) {
            return bProficiency - aProficiency;
          }
          
          const aYears = a.metadata?.years_experience || 0;
          const bYears = b.metadata?.years_experience || 0;
          return bYears - aYears;
        });
      }
    });
    
    return grouped;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return {};
    }
    throw new Error('Failed to fetch skills');
  }
}

// Fetch work experience sorted by date
export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const experience = response.objects as WorkExperience[];
    
    // Sort by start date (most recent first)
    return experience.sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || '').getTime();
      const dateB = new Date(b.metadata?.start_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch work experience');
  }
}

// Fetch all testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const testimonials = response.objects as Testimonial[];
    
    // Sort by featured first, then by creation date
    return testimonials.sort((a, b) => {
      if (a.metadata?.featured && !b.metadata?.featured) return -1;
      if (!a.metadata?.featured && b.metadata?.featured) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
}

// Fetch featured testimonials only
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getTestimonials();
  return testimonials.filter(testimonial => testimonial.metadata?.featured === true);
}