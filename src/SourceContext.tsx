import { type ReactNode, useReducer } from "react";

import {
  SourceContextValue,
  SourceContextActions,
} from "./SourceContextBase.ts";

export interface SourceContextProps {
  children: ReactNode;
}

type SourceState = {
  source: string;
  currentCodePointIndex?: number;
};

type SourceAction =
  | { type: "setSource"; source: string }
  | { type: "defineCurrentCodePointIndex"; index: number }
  | { type: "clearCurrentCodePointIndex" };

function reducer(state: SourceState, action: SourceAction): SourceState {
  switch (action.type) {
    case "setSource":
      return {
        ...state,
        source: action.source,
        currentCodePointIndex: undefined,
      };
    case "defineCurrentCodePointIndex":
      return { ...state, currentCodePointIndex: action.index };
    case "clearCurrentCodePointIndex":
      return { ...state, currentCodePointIndex: undefined };
    default:
      return state;
  }
}

export default function SourceContext({ children }: SourceContextProps) {
  const [state, dispatch] = useReducer(reducer, { source: "" });

  const setSource = (newSource: string) => {
    dispatch({ type: "setSource", source: newSource });
  };

  const defineCurrentCodePointIndex = (index: number) => {
    dispatch({ type: "defineCurrentCodePointIndex", index });
  };

  const clearCurrentCodePointIndex = () => {
    dispatch({ type: "clearCurrentCodePointIndex" });
  };

  return (
    <SourceContextValue value={state}>
      <SourceContextActions
        value={{
          setSource,
          defineCurrentCodePointIndex,
          clearCurrentCodePointIndex,
        }}
      >
        {children}
      </SourceContextActions>
    </SourceContextValue>
  );
}
