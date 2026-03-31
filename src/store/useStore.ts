import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SuitcaseSize = '20' | '24' | '28' | 'custom';
export type Scenario = 'business' | 'family' | 'leisure' | 'outdoor' | 'custom';

export interface Item {
  id: string;
  name: string;
  category: string;
  sizeLevel: 'XS' | 'S' | 'M' | 'L' | 'XL';
  quantity: number;
  isHighFrequency: boolean;
  isFragile: boolean;
  isLiquid: boolean;
  isWrinkleProne: boolean;
  weight?: number; // in grams
  imageUri?: string;
  aiConfidence?: number;
}

export interface LayoutBlock {
  itemId: string;
  zone: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface PackingPlan {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  suitcaseSize: SuitcaseSize;
  suitcaseDimensions?: { w: number; h: number; d: number };
  scenario: Scenario;
  tripDays: number;
  departureDate?: number;
  items: Item[];
  layout?: LayoutBlock[];
  coverImage?: string;
  notes?: string;
}

interface AppState {
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (val: boolean) => void;
  plans: PackingPlan[];
  addPlan: (plan: PackingPlan) => void;
  updatePlan: (id: string, plan: Partial<PackingPlan>) => void;
  deletePlan: (id: string) => void;
  currentPlanId: string | null;
  setCurrentPlanId: (id: string | null) => void;
  
  // Draft plan state for the wizard
  draftPlan: Partial<PackingPlan>;
  updateDraftPlan: (updates: Partial<PackingPlan>) => void;
  resetDraftPlan: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      setHasSeenOnboarding: (val) => set({ hasSeenOnboarding: val }),
      plans: [],
      addPlan: (plan) => set((state) => ({ plans: [plan, ...state.plans] })),
      updatePlan: (id, updates) =>
        set((state) => ({
          plans: state.plans.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p)),
        })),
      deletePlan: (id) => set((state) => ({ plans: state.plans.filter((p) => p.id !== id) })),
      currentPlanId: null,
      setCurrentPlanId: (id) => set({ currentPlanId: id }),
      
      draftPlan: {},
      updateDraftPlan: (updates) => set((state) => ({ draftPlan: { ...state.draftPlan, ...updates } })),
      resetDraftPlan: () => set({ draftPlan: {} }),
    }),
    {
      name: 'smart-luggage-storage',
    }
  )
);
