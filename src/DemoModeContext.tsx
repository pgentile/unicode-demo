import {
  type DemoModeContextValueProps,
  DEFAULT_CONTEXT_VALUE,
  type DemoModeActionsContextProps,
  DemoModeContextValue,
  DemoModeActionsContext,
} from "./DemoModeContextBase.ts";
import { type ReactNode, useState } from "react";
import type { Encoding } from "./common.ts";

export interface DemoModeContextProps {
  children: ReactNode;
}

export default function DemoModeContext({ children }: DemoModeContextProps) {
  const [demoModeValues, setDemoModeValues] =
    useState<DemoModeContextValueProps>(DEFAULT_CONTEXT_VALUE);

  function toggleEncoding(encoding: Encoding) {
    setDemoModeValues((currentState) => {
      const currentEncodings = currentState.enabledEncodings;
      if (currentEncodings.includes(encoding)) {
        return {
          ...currentState,
          enabledEncodings: currentEncodings.filter((e) => e !== encoding),
        };
      } else {
        return {
          ...currentState,
          enabledEncodings: [...currentEncodings, encoding],
        };
      }
    });
  }

  function toggleShowOrigin() {
    setDemoModeValues((currentState) => {
      return {
        ...currentState,
        showOrigin: !currentState.showOrigin,
      };
    });
  }

  function toggleShowJsString() {
    setDemoModeValues((currentState) => {
      return {
        ...currentState,
        showJsString: !currentState.showJsString,
      };
    });
  }

  function toggleShowNormalizationForms() {
    setDemoModeValues((currentState) => {
      return {
        ...currentState,
        showNormalizationForms: !currentState.showNormalizationForms,
      };
    });
  }

  const actions: DemoModeActionsContextProps = {
    toggleEncoding,
    toggleOrigin: toggleShowOrigin,
    toggleJsString: toggleShowJsString,
    toggleNormalizationForms: toggleShowNormalizationForms,
  };

  return (
    <DemoModeContextValue value={demoModeValues}>
      <DemoModeActionsContext value={actions}>
        {children}
      </DemoModeActionsContext>
    </DemoModeContextValue>
  );
}
