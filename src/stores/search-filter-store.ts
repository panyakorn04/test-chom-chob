import { create } from "zustand";

export type AddPocketAction = {
  searchText: string;
  setSearchText: (value: string) => void;
};

export const useSearchFilterStore = create<AddPocketAction>((set) => ({
  searchText: "",
  setSearchText: (data) => set({ searchText: data }),
}));
