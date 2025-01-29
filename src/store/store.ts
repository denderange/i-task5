import { create } from 'zustand';

interface UserSettingsState {
  language: string;
  setLanguage: (language: string) => void;
  likes: number;
  setLikes: (likes: number) => void;
  reviews: number;
  setReviews: (reviews: number) => void;
}

export const useUserSettingsStore = create<UserSettingsState>((set) => ({
  language: 'English (US)',
  setLanguage: (language) => set({ language }),
  likes: 0,
  setLikes: (likes) => set({ likes }),
  reviews: 0,
  setReviews: (reviews) => set({ reviews }),
}));
