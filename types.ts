export type ViewState = 'dashboard' | 'routine' | 'analyzer' | 'studio' | 'maskValidator';

export enum SkinType {
  Oily = 'Oily',
  Dry = 'Dry',
  Combination = 'Combination',
  Sensitive = 'Sensitive'
}

export enum TimeAvailable {
  Five = '5 mins',
  Fifteen = '15 mins',
  Thirty = '30 mins'
}

export enum Goal {
  Hydration = 'Hydration',
  Acne = 'Acne Control',
  AntiAging = 'Anti-Aging'
}

export enum SkinProblem {
  Tanning = 'Tanning & Sun Damage',
  Pimples = 'Acne & Pimples',
  Dryness = 'Dryness & Flaking',
  Dullness = 'Dullness & Dark Spots',
  Oily = 'Excess Oil'
}

export interface MaskValidationResult {
  isSafe: boolean;
  score: number; // 1-10
  verdict: string; // "Dermatologist Approved" or "Kitchen Disaster"
  explanation: string;
  warnings: string[];
  betterAlternatives: string[];
}

export interface IngredientDetail {
  name: string;
  type: 'good' | 'bad' | 'caution' | 'neutral';
  description: string;
  slang: string;
}

export interface SynergyResult {
  pair: string;
  description: string;
  type: 'boost' | 'conflict';
}

export interface IngredientAnalysis {
  score: number;
  identifiedIngredients: IngredientDetail[];
  synergies: SynergyResult[];
  vibe: string; // e.g. "The Hydration Station"
  summary: string;
  cocktailVerdict: string; // New holistic judgment
}

export interface RoutineItem {
  step: string;
  product: string;
  note?: string;
}

export interface Routine {
  morning: RoutineItem[];
  evening: RoutineItem[];
}

export interface MarketProduct {
  brand: string;
  name: string;
  priceLevel: '$' | '$$' | '$$$';
  description?: string;
}