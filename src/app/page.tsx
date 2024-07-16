"use client";
import { Suspense } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemon } from "@/api";
import { Button } from "@/components/ui/button";
import ProductsGrid from "@/components/products-grid";
import ProductsList from "@/components/products-list";
import { useInView } from "react-intersection-observer";
import React from "react";
import { useSearchFilterStore } from "@/stores/search-filter-store";
import { useTabsState } from "@/hooks/use-tabs-state";
import ToggleGridList from "@/components/toggle-grid-list";
import { Tabs } from "@/components/toggle-grid-list";
const DEFAULT_TAB = Tabs.grid;

export default function Home() {
  const { ref, inView } = useInView();
  const tabsState = useTabsState(DEFAULT_TAB);

  const { searchText } = useSearchFilterStore();
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      enabled: !!searchText,
      queryKey: ["pokemon", searchText],
      queryFn: async ({ pageParam }: { pageParam: string }) => {
        const res = await getPokemon([pageParam, searchText]);
        return res;
      },
      initialPageParam: "0",
      getPreviousPageParam: (firstPage) => firstPage?.previous ?? undefined,
      getNextPageParam: (lastPage) => {
        if (lastPage?.next) {
          return new URL(lastPage.next).searchParams.get("offset");
        }
        return undefined;
      },
    });

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const itemsCount = data?.pages[0]?.count;
  return (
    <div className="py-10">
      <div className="flex items-center justify-between">
        <h1 className="">
          Products {`(${itemsCount?.toLocaleString() ?? 0})`}
        </h1>
        <div>
          <ToggleGridList />
        </div>
      </div>
      <div className="py-10">
        {tabsState.value === Tabs.grid ? (
          <ProductsGrid data={data} isLoading={isLoading} />
        ) : (
          <ProductsList data={data} isLoading={isLoading} />
        )}
        <div>
          <Button
            variant={"ghost"}
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load Newer"
              : "Nothing more to load"}
          </Button>
        </div>
      </div>
    </div>
  );
}
