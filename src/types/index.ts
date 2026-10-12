export type StockCategory = 
  | 'Business'
  | 'Technology'
  | 'Nature'
  | 'Food'
  | 'Lifestyle'
  | 'Abstract';

export type VisualStyle = 
  | 'Photorealistic'
  | '3D Render'
  | 'Minimalist'
  | 'Flat Vector';

export type AspectRatio = '1:1' | '4:3' | '3:2' | '16:9' | '9:16';

export interface PromptBreakdown {
  subject: string;
  composition: string;
  lighting: string;
  background: string;
  visualStyle: string;
}

export interface GeneratedPrompt {
  id: string;
  angleTitle: string;
  breakdown: PromptBreakdown;
  fullPrompt: string;
  midjourneyPrompt: string;
  aspectRatio: AspectRatio;
  category: StockCategory;
  visualStyle: VisualStyle;
  recommendedStockTitle: string;
  keywords: string[];
  copySpaceLocation: string;
  commercialValueTip: string;
}

export interface GenerationSession {
  id: string;
  topic: string;
  category: StockCategory;
  visualStyle: VisualStyle;
  aspectRatio: AspectRatio;
  timestamp: number;
  prompts: GeneratedPrompt[];
}
