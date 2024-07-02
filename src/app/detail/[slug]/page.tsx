import { getPokemonBySlug } from "@/api";
import Detail from "@/components/product-detail";
import ButtonBlack from "@/components/product-detail/button-black";
import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "detail...",
  description: "detail...",
};
async function getPokemonServer(slug: string) {
  const response = await getPokemonBySlug(slug);
  return response;
}

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getPokemonServer(slug);
  if (!data) {
    return redirect("/404");
  }
  return (
    <div className="py-10">
      <h1 className="sr-only">{data?.name}</h1>
      <ButtonBlack />
      <div className="py-2">
        <Detail data={data} />
      </div>
    </div>
  );
}
