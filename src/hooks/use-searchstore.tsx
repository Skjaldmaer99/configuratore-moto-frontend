import { create } from 'zustand';

interface SearchState {
    searchTerm: string;
    debouncedSearch: string;
    setSearchTerm: (term: string) => void;
    setDebouncedSearch: (term: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    searchTerm: '',
    debouncedSearch: '',
    setSearchTerm: (term) => set({ searchTerm: term }),
    setDebouncedSearch: (term) => set({ debouncedSearch: term }),
}));