# Developer Portfolio Website

![App Preview](https://imgix.cosmicjs.com/b8130620-82a3-11f0-a561-cd0208bbad0c-photo-1556742049-0cfed4f6a45d-1756230010001.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, performance-focused developer portfolio website built with Astro and powered by Cosmic CMS. This static site showcases projects, skills, work experience, and testimonials with excellent SEO and lightning-fast performance.

## ✨ Features

- **Ultra-Fast Performance** - Static site generation with minimal JavaScript
- **Responsive Design** - Optimized for all devices and screen sizes
- **SEO Optimized** - Built-in meta tags and structured data
- **Project Showcase** - Featured projects with galleries and detailed descriptions
- **Skills Matrix** - Organized by category with proficiency levels
- **Work Experience Timeline** - Professional history with achievements
- **Client Testimonials** - Reviews with ratings and photos
- **Contact Integration** - Professional contact information and links
- **Smooth Animations** - Subtle transitions and hover effects

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68adf0fb1f09167261d59132&clone_repository=68adf2891f09167261d5915d)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a web developer portfolio with projects, skills, work experience, and testimonials"

### Code Generation Prompt

> "Set up an Astro website powered by my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Astro** - Static site generator for ultra-fast performance
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **Vanilla JavaScript** - Minimal client-side JavaScript for interactions

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and bun
- A Cosmic account with your portfolio content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Start the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:4321](http://localhost:4321) in your browser

## 📡 Cosmic SDK Examples

### Fetching Projects
```typescript
import { cosmic } from '../lib/cosmic'

export async function getProjects() {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects.sort((a, b) => {
      if (a.metadata?.featured && !b.metadata?.featured) return -1
      if (!a.metadata?.featured && b.metadata?.featured) return 1
      return 0
    })
  } catch (error) {
    if (error.status === 404) return []
    throw error
  }
}
```

### Fetching Skills by Category
```typescript
export async function getSkillsByCategory() {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    const skills = response.objects
    const grouped = skills.reduce((acc, skill) => {
      const category = skill.metadata?.category?.key || 'other'
      if (!acc[category]) acc[category] = []
      acc[category].push(skill)
      return acc
    }, {} as Record<string, any[]>)
    
    return grouped
  } catch (error) {
    if (error.status === 404) return {}
    throw error
  }
}
```

## 🔗 Cosmic CMS Integration

This portfolio leverages your existing Cosmic content structure:

- **Projects** - Showcase your development work with images, descriptions, and technology stacks
- **Skills** - Display technical abilities organized by category with proficiency levels
- **Work Experience** - Professional timeline with achievements and company information
- **Testimonials** - Client and colleague reviews with ratings and photos

All content is fetched at build time for optimal performance, with easy updates through the Cosmic dashboard.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add your Cosmic environment variables
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `dist/`
4. Add your Cosmic environment variables

### Other Static Hosts
The built files in `/dist` can be deployed to any static hosting service.

---

For more information about Astro, visit [astro.build](https://astro.build)
For Cosmic CMS documentation, visit [cosmicjs.com/docs](https://www.cosmicjs.com/docs)
<!-- README_END -->