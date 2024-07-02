"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";
import { useAddPocketStore } from "@/stores/add-pocket-store";
import { useSearchFilterStore } from "@/stores/search-filter-store";
import { Separator } from "./ui/separator";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  const { cart } = useAddPocketStore();
  const { searchText, setSearchText } = useSearchFilterStore();
  return (
    <div className="flex min-h-screen w-full flex-col justify-center">
      <div className={" h-[42px] bg-yellow-500 "}>
        <div
          className={
            "container w-full h-full flex items-center justify-between"
          }
        >
          <h1 className={"text-sm"}>Welcome to Pokemon shop!</h1>
          <div className={"flex justify-center space-x-1 text-sm"}>
            <Button variant={"link"} className="flex gap-2 px-1">
              <Image
                src="/icons/location.png"
                alt="location"
                width={16}
                height={16}
              />
              Contact 123456
              <Separator orientation="vertical" className=" bg-gray-600" />
            </Button>

            <Button variant={"link"} className="flex gap-2 px-1">
              <Image
                src="/icons/iconoir_delivery-truck.png"
                alt="location"
                width={16}
                height={16}
              />
              Track your order
              <Separator orientation="vertical" className="  bg-gray-600" />
            </Button>
            <Button variant={"link"} className="flex gap-2 px-1">
              <Image
                src="/icons/discount.png"
                alt="location"
                width={16}
                height={16}
              />
              All Offers
            </Button>
          </div>
        </div>
      </div>
      <div
        className={
          "h-[80px] flex items-center justify-around   w-full   shadow-md"
        }
      >
        <div onClick={() => route.push("/")} className="cursor-pointer">
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-auto h-auto"
          />
        </div>
        <div className="flex h-12 w-[507px] space-x-2 items-center px-2 border border-gray-300 rounded-lg bg-gray-100 focus-within:border-yellow-500 focus-within:bg-white">
          <Search
            size={24}
            className=" text-yellow-500 group-focus-within:text-yellow-600"
          />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value as string)}
            placeholder="Search name Pokemon"
            className=" w-full h-full text-sm bg-gray-100  focus:bg-white focus:outline-none caret-yellow-500 "
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={"ghost"} className="gap-2">
            <Image
              src="/icons/user.png"
              alt="user"
              width={24}
              height={24}
              className="size-6"
            />
            Username
          </Button>
          <Separator
            orientation="vertical"
            className="  bg-gray-600 h-[24px]"
          />
          <Button
            variant={"ghost"}
            onClick={() => route.push("/cart")}
            className="gap-2"
          >
            <div className="relative">
              <Image
                src="/icons/bag-2.png"
                alt="pocket"
                width={24}
                height={24}
                priority
                className="object-cover size-6 rounded-lg"
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cart.length.toLocaleString()}
                </span>
              )}
            </div>
            Pocket
          </Button>
        </div>
      </div>
      <main className={"container"}>{children}</main>
      <footer className="bg-black h-[54px] flex items-center justify-center mt-auto">
        <p className="text-sm text-white">
          Copyright © 2023 ChomCHOB. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
