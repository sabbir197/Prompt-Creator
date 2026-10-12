import { StockCategory, VisualStyle, AspectRatio } from '../types';

export const STOCK_CATEGORIES: { id: StockCategory; label: string; description: string }[] = [
  { id: 'Business', label: 'Business', description: 'Corporate, finance, remote work, modern workplace & collaboration' },
  { id: 'Technology', label: 'Technology', description: 'AI, cloud computing, cybersecurity, smart devices & digital innovation' },
  { id: 'Nature', label: 'Nature', description: 'Landscapes, wildlife, seasonal environments, flora & organic textures' },
  { id: 'Food', label: 'Food', description: 'Culinary arts, fresh ingredients, cafe culture & gourmet dining' },
  { id: 'Lifestyle', label: 'Lifestyle', description: 'Wellness, daily routines, family, fitness, travel & hobbies' },
  { id: 'Abstract', label: 'Abstract', description: 'Geometric patterns, dynamic fluid motion, gradients & conceptual textures' },
];

export const VISUAL_STYLES: { id: VisualStyle; label: string; description: string; promptModifier: string }[] = [
  {
    id: 'Photorealistic',
    label: 'Photorealistic',
    description: 'High-end commercial stock photography shot on professional cameras',
    promptModifier: 'shot on 85mm f/1.4 lens, Hasselblad medium format camera, natural filmic skin tones, pin-sharp optical clarity, 8k commercial stock photography',
  },
  {
    id: '3D Render',
    label: '3D Render',
    description: 'Modern tactile 3D isometric or clay-style modeling with physical materials',
    promptModifier: 'octane render, Cinema 4D, Ray-traced subsurface scattering, matte clay and frosted glass textures, smooth ambient occlusion, ultra-refined studio render',
  },
  {
    id: 'Minimalist',
    label: 'Minimalist',
    description: 'Generous clean negative space, sparse geometry, serene high-key palette',
    promptModifier: 'scandinavian minimalist design, expansive negative copy space, soft monochrome palette, clean spatial balance, editorial graphic composition',
  },
  {
    id: 'Flat Vector',
    label: 'Flat Vector',
    description: 'Clean modern digital illustration, scalable vector art aesthetic',
    promptModifier: 'clean vector illustration style, sharp clean SVG curves, flat color blocking, elegant contemporary commercial graphic art, no gradients or noise',
  },
];

export const ASPECT_RATIOS: { id: AspectRatio; label: string; ratioDisplay: string; bestFor: string }[] = [
  { id: '16:9', label: '16:9', ratioDisplay: '16:9', bestFor: 'Website hero banners, desktop presentation slides' },
  { id: '3:2', label: '3:2', ratioDisplay: '3:2', bestFor: 'Classic 35mm DSLR stock photography standard' },
  { id: '4:3', label: '4:3', ratioDisplay: '4:3', bestFor: 'Tablet displays, catalog grids, editorial layouts' },
  { id: '1:1', label: '1:1', ratioDisplay: '1:1', bestFor: 'Social feeds, square product cards, profile graphics' },
  { id: '9:16', label: '9:16', ratioDisplay: '9:16', bestFor: 'Mobile wallpaper, Instagram reels & vertical stories' },
];

export const TOPIC_SUGGESTIONS: { topic: string; category: StockCategory; style: VisualStyle }[] = [
  { topic: 'Winter Aesthetic', category: 'Nature', style: 'Photorealistic' },
  { topic: 'Eco-Friendly Products', category: 'Business', style: 'Photorealistic' },
  { topic: 'Remote Team Collaboration', category: 'Business', style: 'Photorealistic' },
  { topic: 'Cybersecurity Network Cloud', category: 'Technology', style: '3D Render' },
  { topic: 'Artisan Sourdough Bakery', category: 'Food', style: 'Photorealistic' },
  { topic: 'Mindful Morning Meditation', category: 'Lifestyle', style: 'Minimalist' },
  { topic: 'Futuristic Artificial Intelligence', category: 'Technology', style: '3D Render' },
  { topic: 'Sustainable Solar Energy Architecture', category: 'Technology', style: 'Photorealistic' },
  { topic: 'Organic Botanical Cosmetics', category: 'Lifestyle', style: 'Minimalist' },
  { topic: 'Dynamic Flowing Fluid Gradients', category: 'Abstract', style: '3D Render' },
];
