import React from "react";
import PocketList from "./pocket-list";
import OrderSummary from "./order-summary";

type Props = {};

export default function CartComponent({}: Props) {
  return (
    <div className="p-6 grid grid-cols-6 gap-14">
      <div className="col-span-4">
        <PocketList />
      </div>
      <div className="col-span-2">
        <OrderSummary />
      </div>
    </div>
  );
}
