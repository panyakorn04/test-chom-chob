import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAddPocketStore } from "@/stores/add-pocket-store";
import { Button } from "../ui/button";

export default function OrderSummary() {
  const { cart } = useAddPocketStore();

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex text-base items-center gap-2">
            Order summary
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className=" py-6 flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold">Subtotal</h2>
          <p className="text-sm text-muted-foreground">
            {cart?.length || 0} product
          </p>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold">Quantity</h2>
          <p className="text-sm text-muted-foreground">
            {cart.reduce((acc, item) => acc + item.quantity, 0)} quantity
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4">
        <Button
          disabled={cart.length === 0}
          variant={"destructive"}
          className="w-full"
          onClick={() => {
            console.log("Checkout", cart);
          }}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
