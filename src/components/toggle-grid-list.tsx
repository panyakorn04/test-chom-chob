import React from "react";
import { Button } from "./ui/button";
import { useTabsState } from "@/hooks/use-tabs-state";
import { cn } from "@/lib/utils";

export enum Tabs {
  grid = "grid",
  list = "list",
}

const DEFAULT_TAB = Tabs.grid;
export default function ToggleGridList() {
  const tabsState = useTabsState(DEFAULT_TAB);

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={() => tabsState.onValueChange(Tabs.grid)}
        className={cn(
          "rounded-r-none",
          tabsState.value === "grid"
            ? "bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
            : " bg-gray-200 text-black hover:bg-yellow-500"
        )}
      >
        Grid
      </Button>
      <Button
        variant={"ghost"}
        onClick={() => tabsState.onValueChange(Tabs.list)}
        className={cn(
          " rounded-l-none",
          tabsState.value === "list"
            ? "bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
            : "bg-gray-200 text-black hover:bg-yellow-500"
        )}
      >
        List
      </Button>
    </>
  );
}
