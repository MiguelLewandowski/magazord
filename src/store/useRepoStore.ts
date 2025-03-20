import { create } from "zustand";

interface FiltersState {
  searchRepo: string;
  searchInput: string;
  activeTab: "repositories" | "starred";
  type: string;
  language: string;
  setFilters: (filters: Partial<FiltersState>) => void;
  submitSearch: () => void;
  setActiveTab: (tab: "repositories" | "starred") => void;
  clearSearch: () => void;
}

const useRepoStore = create<FiltersState>((set) => ({
  searchRepo: "",
  searchInput: "",
  activeTab: "repositories",
  type: "all",
  language: "all",
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  submitSearch: () =>
    set((state) => ({
      ...state,
      searchRepo: state.searchInput,
    })),
  setActiveTab: (tab) =>
    set((state) => ({
      ...state,
      activeTab: tab,
      searchRepo: "",
      searchInput: "",
    })),
  clearSearch: () =>
    set((state) => ({
      ...state,
      searchRepo: "",
      searchInput: "",
    })),
}));

export default useRepoStore;
