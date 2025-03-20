import {create} from "zustand";

interface TabState {
  activeTab: number;
  setActiveTab: (tabIndex: number) => void;
}

export const useTabStore = create<TabState>((set) => ({
  activeTab: 1,
  setActiveTab: (tabIndex) => set({ activeTab: tabIndex }),
}));