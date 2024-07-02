import { create } from "zustand";
import { TypePokemon } from "@/api";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

interface AddPocketState extends TypePokemon {
  quantity: number;
}

export type AddPocketAction = {
  cart: AddPocketState[];
  addPocket: (data: TypePokemon, quantity?: number) => void;
  removePocket: (id: number) => void;
};
const hashStorage: StateStorage = {
  getItem: (key): string => {
    const localValue = localStorage.getItem(key) ?? "";
    return JSON.parse(localValue);
  },
  setItem: (key, newValue): void => {
    localStorage.setItem(key, JSON.stringify(newValue));
  },
  removeItem: (key): void => {
    localStorage.removeItem(key);
  },
};

export const useAddPocketStore = create(
  persist<AddPocketAction>(
    (set) => ({
      cart: [],
      addPocket: (data, quantity = 1) =>
        set((state) => {
          const isExist = state.cart.find((item) => item.id === data.id);
          if (isExist) {
            return {
              cart: state.cart.map((item) =>
                item.id === data.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { ...data, quantity }],
          };
        }),

      removePocket: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "add-pocket",
      storage: createJSONStorage(() => hashStorage),
    }
  )
);
