import { createContext, useContext } from "react";
import { ALL_ENCODINGS, type Encoding } from "./common.ts";

export interface DemoModeContextValueProps {
  enabledEncodings: Encoding[];
  showOrigin: boolean;
  showJsString: boolean;
  showNormalizationForms: boolean;
}

export const DEFAULT_CONTEXT_VALUE: DemoModeContextValueProps = {
  enabledEncodings: [...ALL_ENCODINGS],
  showOrigin: true,
  showJsString: true,
  showNormalizationForms: true,
};

export const DemoModeContextValue = createContext<DemoModeContextValueProps>(
  DEFAULT_CONTEXT_VALUE,
);

export function useDemoModeProps(): DemoModeContextValueProps {
  return useContext(DemoModeContextValue);
}

function doNothing() {}

export interface DemoModeActionsContextProps {
  toggleEncoding: (encoding: Encoding) => void;
  toggleOrigin: () => void;
  toggleJsString: () => void;
  toggleNormalizationForms: () => void;
}

export const DemoModeActionsContext =
  createContext<DemoModeActionsContextProps>({
    toggleEncoding: doNothing,
    toggleOrigin: doNothing,
    toggleJsString: doNothing,
    toggleNormalizationForms: doNothing,
  });

export function useDemoModeActions(): DemoModeActionsContextProps {
  return useContext(DemoModeActionsContext);
}
