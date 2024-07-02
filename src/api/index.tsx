import { getConfig } from "@/cont/config";
import axios from "axios";

const instance = axios.create({
  baseURL: getConfig().API_HOST,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export const getPokemon = async (
  queryKey: string[] = []
): Promise<TypePokemonResponse | undefined> => {
  try {
    const [pageParam, searchQuery] = queryKey;
    const response = await instance.get(`/pokemon`, {
      params: {
        limit: searchQuery ? 2000 : 20,
        offset: pageParam,
        name: searchQuery.toLowerCase() || undefined,
      },
    });
    const results: TypePokemon[] = [];
    const getPokemonSwitchSearch = async (searchQuery: string) => {
      switch (searchQuery) {
        case searchQuery:
          const searchResults = response.data.results.filter((pokemon: any) =>
            pokemon.name.includes(searchQuery.trim().toLowerCase())
          );
          for (const pokemon of searchResults) {
            const pokemonData = await getPokemonBySlug(pokemon.name);
            if (pokemonData) {
              results.push(pokemonData);
            }
          }
          return {
            count: response.data.count,
            next: response.data.next,
            previous: response.data.previous,
            results,
          };
        case undefined:
          for (const pokemon of response.data.results) {
            const pokemonData = await getPokemonBySlug(pokemon.name);
            if (pokemonData) {
              results.push(pokemonData);
            }
          }
          return {
            count: response.data.count,
            next: response.data.next,
            previous: response.data.previous,
            results,
          };
      }
    };
    return getPokemonSwitchSearch(searchQuery);
  } catch (error) {
    console.error(error);
  }
};

export const getPokemonBySlug = async (
  slug: string
): Promise<TypePokemon | undefined> => {
  try {
    const response = await instance.get(`/pokemon/${slug}`);
    return {
      id: response.data.id,
      name: response.data.name,
      stats: response.data.stats,
      abilities: response.data.abilities,
      types: response.data.types,
      image: response.data.sprites.other.home.front_default,
    };
  } catch (error) {
    console.error(error);
  }
};

export type TypePokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TypePokemon[];
};

export interface TypePokemon {
  id: number;
  name: string;
  image: string;
  stats: TypeStats[];
  abilities: TypeAbilities[];
  types: TypesType[];
}

export type TypeStats = {
  base_stat: number;
  effort: number;
  stat: Name;
};

export type TypeAbilities = {
  ability: Name;
};

export type TypesType = {
  type: Name;
};

type Name = {
  name: string;
};
