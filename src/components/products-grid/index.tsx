import { TypePokemon, TypePokemonResponse } from "@/api";
import React from "react";
import CardGrid from "./card";
import { InfiniteData } from "@tanstack/react-query";

// interface ModifiedType {
//   pages: (TypePokemonResponse | undefined)[] | undefined;
//   pageParams: string[];
// }

type Props = {
  data: InfiniteData<TypePokemonResponse | undefined, unknown> | undefined;
  isLoading?: boolean;
};

export default function Index({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 rounded-lg h-[378px] w-full"
          ></div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data?.pages?.map((page: any, pageIndex: number) => (
        <React.Fragment key={`${page.next}-${pageIndex}`}>
          {page.results.map((pokemon: TypePokemon) => (
            <CardGrid key={pokemon.name} data={pokemon} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
