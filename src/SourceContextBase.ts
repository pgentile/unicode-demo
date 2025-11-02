import { createContext, useContext } from "react";
import { ALL_ENCODINGS, type Encoding } from "./common.ts";

export interface SourceContextProps {
  source: string;
  currentCodePointIndex?: number;
  demo: {
    enabledEncodings: readonly Encoding[];
    showOrigin: boolean;
    showJsString: boolean;
    showNormalizationForms: boolean;
  };
  infoOfCodePoint?: number;
}

export const DEFAULT_SOURCE_PROPS: SourceContextProps = {
  source: "",
  demo: {
    enabledEncodings: ALL_ENCODINGS,
    showOrigin: true,
    showJsString: true,
    showNormalizationForms: true,
  },
};

export const SourceContextValue = createContext(DEFAULT_SOURCE_PROPS);

export interface SourceContextActionsProps {
  setSource: (newSource: string) => void;
  defineCurrentCodePointIndex: (index: number) => void;
  clearCurrentCodePointIndex: () => void;
  toggleEncoding: (encoding: Encoding) => void;
  toggleShowOrigin: () => void;
  toggleShowJsString: () => void;
  toggleShowNormalizationForms: () => void;
  displayInfoOfCodePoint: (codePoint: number) => void;
  hideInfoOfCodePoint: () => void;
}

function doNothing() {}

export const SourceContextActions = createContext<SourceContextActionsProps>({
  setSource: doNothing,
  defineCurrentCodePointIndex: doNothing,
  clearCurrentCodePointIndex: doNothing,
  toggleEncoding: doNothing,
  toggleShowOrigin: doNothing,
  toggleShowJsString: doNothing,
  toggleShowNormalizationForms: doNothing,
  displayInfoOfCodePoint: doNothing,
  hideInfoOfCodePoint: doNothing,
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

export function useDemoEncodings(): [
  readonly Encoding[],
  SourceContextActionsProps["toggleEncoding"],
] {
  const { demo } = useContext(SourceContextValue);
  const { toggleEncoding } = useContext(SourceContextActions);
  return [demo.enabledEncodings, toggleEncoding];
}

export function useDemoShowOrigin(): [
  boolean,
  SourceContextActionsProps["toggleShowOrigin"],
] {
  const { demo } = useContext(SourceContextValue);
  const { toggleShowOrigin } = useContext(SourceContextActions);
  return [demo.showOrigin, toggleShowOrigin];
}

export function useDemoShowJsString(): [
  boolean,
  SourceContextActionsProps["toggleShowJsString"],
] {
  const { demo } = useContext(SourceContextValue);
  const { toggleShowJsString } = useContext(SourceContextActions);
  return [demo.showJsString, toggleShowJsString];
}

export function useDemoShowNormalizationForms(): [
  boolean,
  SourceContextActionsProps["toggleShowNormalizationForms"],
] {
  const { demo } = useContext(SourceContextValue);
  const { toggleShowNormalizationForms } = useContext(SourceContextActions);
  return [demo.showNormalizationForms, toggleShowNormalizationForms];
}

export function useInfoOfCodePoint(): [
  number | null,
  SourceContextActionsProps["displayInfoOfCodePoint"],
  SourceContextActionsProps["hideInfoOfCodePoint"],
] {
  const { infoOfCodePoint } = useContext(SourceContextValue);
  const { displayInfoOfCodePoint, hideInfoOfCodePoint } =
    useContext(SourceContextActions);
  return [infoOfCodePoint ?? null, displayInfoOfCodePoint, hideInfoOfCodePoint];
}
