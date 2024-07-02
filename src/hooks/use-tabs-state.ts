"use client";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";

export const useTabsState = (
  defaultValue: string
): {
  onValueChange: (tab: string) => void;
  value: string;
  defaultValue: string;
} => {
  const [value, setValue] = useQueryState(
    "tab",
    parseAsString.withDefault(defaultValue)
  );

  const onValueChange = React.useCallback(
    (tab: string) => {
      setValue(tab);
    },
    [setValue]
  );

  React.useEffect(() => {
    // Ensure that the tab state is updated when the queryTab changes
    setValue(value);
  }, [setValue, value]);

  return { onValueChange, value: value, defaultValue };
};
