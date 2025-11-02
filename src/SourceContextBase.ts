import { createContext, useContext } from "react";

export interface SourceContextProps {
  source: string;
  currentCodePointIndex?: number;
}

export const SourceContextValue = createContext<SourceContextProps>({
  source: "",
});

export interface SourceContextActionsProps {
  setSource: (newSource: string) => void;
  defineCurrentCodePointIndex: (index: number) => void;
  clearCurrentCodePointIndex: () => void;
}

function doNothing() {}

export const SourceContextActions = createContext<SourceContextActionsProps>({
  setSource: doNothing,
  defineCurrentCodePointIndex: doNothing,
  clearCurrentCodePointIndex: doNothing,
});

export function useSource(): [string, SourceContextActionsProps["setSource"]] {
  const { source } = useContext(SourceContextValue);
  const { setSource } = useContext(SourceContextActions);
  return [source, setSource];
}

export function useCurrentCodePointIndex(): [
  number | null,
  SourceContextActionsProps["defineCurrentCodePointIndex"],
  SourceContextActionsProps["clearCurrentCodePointIndex"],
] {
  const { currentCodePointIndex } = useContext(SourceContextValue);
  const { defineCurrentCodePointIndex, clearCurrentCodePointIndex } =
    useContext(SourceContextActions);
  return [
    currentCodePointIndex ?? null,
    defineCurrentCodePointIndex,
    clearCurrentCodePointIndex,
  ];
}
