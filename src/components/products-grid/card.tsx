import React from "react";
import { TypePokemon } from "@/api";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "../ui/badge";
type Props = {
  data: TypePokemon;
};

export default function CardGrid({ data }: Props) {
  const route = useRouter();
  return (
    <Card className="">
      <CardHeader>
        <Image
          src={data.image}
          alt={data.name}
          width={200}
          height={200}
          priority
          className="object-cover aspect-[1/1] w-full rounded-lg"
        />
      </CardHeader>
      <CardContent className="py-4">
        <h1 className="text-base font-bold capitalize">{data.name}</h1>
        {data.types.map((type) => (
          <Badge key={type.type.name} className="mr-2 rounded">
            {type.type.name}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="flex">
        <Button
          className="w-full"
          onClick={() => {
            route.push(`/detail/${data.name}`);
          }}
        >
          Detail
        </Button>
      </CardFooter>
    </Card>
  );
}
