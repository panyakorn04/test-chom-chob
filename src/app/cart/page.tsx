"use client";
import CartComponent from "@/components/cart-order";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="py-10">
      <CartComponent />
    </div>
  );
}
