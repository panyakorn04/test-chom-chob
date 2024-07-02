"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";

import { TypeAbilities, TypeStats, TypesType, TypePokemon } from "@/api";
import { useAddPocketStore } from "@/stores/add-pocket-store";
type Props = {
  data: TypePokemon;
};

export default function Detail({ data }: Props) {
  const [quantity, setQuantity] = React.useState(1);

  const { addPocket } = useAddPocketStore();
  return (
    <Card className="w-full p-4">
      <CardContent className="p-0 flex gap-10 ">
        <div className=" ">
          <Image
            src={data.image || "/no-image.png"}
            alt={data.name}
            width={500}
            height={500}
            className=" aspect-[1/1]  size-80"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-[14px]">
            <p className="font-bold text-base capitalize">{data?.name}</p>
            <div className="flex gap-4 items-center">
              <div className="flex gap-[10px]">
                {data.types?.map((item: TypesType) => (
                  <Badge
                    key={item.type.name}
                    className="text-xs capitalize py-1 px-2 rounded-lg font-bold"
                  >
                    {item.type.name},
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-sm text-muted-foreground">Stats:</p>
              <ul className="flex">
                {data.stats?.map((stat: TypeStats) => (
                  <li key={stat.stat.name} className="text-muted-foreground">
                    {stat.stat.name}: {stat.base_stat},
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-sm text-muted-foreground">Abilities:</p>
              <ul className="flex">
                {data.abilities.map((ability: TypeAbilities) => (
                  <li
                    key={ability.ability.name}
                    className="text-muted-foreground"
                  >
                    {ability.ability.name},
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center space-x-10  w-[254px] justify-between">
              <p className="text-sm text-muted-foreground">Quantity:</p>
              <div className="flex group border border-gray-500 rounded-md">
                <Button
                  disabled={quantity < 2}
                  variant={"outline"}
                  className="rounded-r-none"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </Button>
                <input
                  value={(quantity < 1 ? 1 : quantity).toString()}
                  onChange={(e) => {
                    setQuantity(Number(e.target.value));
                  }}
                  className="rounded-none focus:outline-none border border-gray-300 w-16 text-center "
                />
                <Button
                  variant={"outline"}
                  className="rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <Button
                className=" w-[254px] "
                variant={"destructive"}
                onClick={() => addPocket(data, quantity)}
              >
                Add to pocket
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
