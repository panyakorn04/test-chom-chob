import React from "react";
import { TypePokemon } from "@/api";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "../ui/badge";
type Props = {
  data: TypePokemon;
};

export default function CardList({ data }: Props) {
  const route = useRouter();
  return (
    <Card
      className="w-full hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        route.push(`/detail/${data.name}`);
      }}
    >
      <CardContent className="flex gap-4 p-[14px]">
        <Image
          src={data.image}
          alt={data.name}
          width={100}
          height={100}
          priority
          className=" object-cover size-20 aspect-[1/1] rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h1 className=" text-base font-bold capitalize">{data.name}</h1>
          <div className="">
            {data.types.map((type) => (
              <Badge key={type.type.name} className="mr-2 rounded">
                {type.type.name}
              </Badge>
            ))}
          </div>
          <div className="flex text-xs">
            <p>Abilities:</p>
            {data.abilities.map((ability) => (
              <div key={ability.ability.name} className="mr-2">
                {ability.ability.name}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
