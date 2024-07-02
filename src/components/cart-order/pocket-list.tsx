import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { useAddPocketStore } from "@/stores/add-pocket-store";

export default function PocketList() {
  const { cart, removePocket } = useAddPocketStore();
  return (
    <Card className="p-6">
      <CardContent className="px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold">
            Pocket list {`(${cart?.length || 0})`}
          </h2>
        </div>
        <div className="flex flex-col w-full py-4 space-y-4">
          <div className=" grid grid-cols-5">
            <h2 className="text-sm font-semibold col-span-3">Product name</h2>
            <p className="text-sm text-gray-500 col-span-1 text-center">
              Quantity
            </p>
          </div>
          {cart.length > 0 ? (
            cart?.map((item) => (
              <div key={item.id} className="grid grid-cols-5  border-t-2 pt-4">
                <div className="col-span-3 flex gap-4">
                  <Image
                    src={item.image}
                    alt="name"
                    width={50}
                    height={50}
                    className="size-20 object-cover aspect-[1/1]"
                  />
                  <div className="col-span-2 h-full flex items-start justify-center flex-col gap-1">
                    <h2 className="text-base font-semibold">{item.name}</h2>
                    <div className=" space-x-2">
                      {item.types?.map((type) => (
                        <Badge
                          key={type.type.name}
                          className="text-xs rounded capitalize"
                        >
                          {type.type.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-2 items-center justify-items-center">
                  <div className="col-span-1">
                    <p className="text-sm font-semibold">{item?.quantity}</p>
                  </div>
                  <div className="col-span-1">
                    <Button
                      variant={"ghost"}
                      className="text-sm"
                      onClick={() => removePocket(item?.id)}
                    >
                      <Trash2 size={16} className=" text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-32">
              <p className="text-sm text-gray-500">No items in the pocket</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
