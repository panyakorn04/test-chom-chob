"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

type Props = {};

export default function ButtonBlack({}: Props) {
  const route = useRouter();
  return (
    <Button
      variant={"link"}
      onClick={() => route.back()}
      className="px-0 gap-2"
    >
      <ChevronLeft size={14} />
      Back
    </Button>
  );
}
