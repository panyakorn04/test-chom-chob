import { TypePokemon, TypePokemonResponse } from "@/api";
import React from "react";
import CardList from "./card";
import { InfiniteData } from "@tanstack/react-query";

type Props = {
  data: InfiniteData<TypePokemonResponse | undefined, unknown> | undefined;
  isLoading?: boolean;
};

export default function Index({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 rounded-lg h-40 w-full"
          ></div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      {data?.pages?.map((page: any, pageIndex: number) => (
        <React.Fragment key={`${page.next}-${pageIndex}`}>
          {page.results.map((pokemon: TypePokemon) => (
            <CardList key={pokemon.name} data={pokemon} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
