import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  site: 'https://your-portfolio-domain.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});