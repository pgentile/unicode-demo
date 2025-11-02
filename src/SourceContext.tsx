import { type ReactNode, useReducer } from "react";

import {
  type SourceContextProps as SourceState,
  SourceContextValue,
  SourceContextActions,
  DEFAULT_SOURCE_PROPS,
} from "./SourceContextBase.ts";
import type { Encoding } from "./common.ts";

export interface SourceContextProps {
  children: ReactNode;
}

type SourceAction =
  | { type: "setSource"; source: string }
  | { type: "defineCurrentCodePointIndex"; index: number }
  | { type: "clearCurrentCodePointIndex" }
  | { type: "toggleEncoding"; encoding: Encoding }
  | { type: "toggleShowOrigin" }
  | { type: "toggleShowJsString" }
  | { type: "toggleShowNormalizationForms" }
  | { type: "displayInfoOfCodePoint"; codePoint: number }
  | { type: "hideInfoOfCodePoint" }
  | { type: "toggleTextDirection" };

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
    case "toggleEncoding": {
      const addEncoding = !state.demo.enabledEncodings.includes(
        action.encoding,
      );
      const enabledEncodings = addEncoding
        ? [...state.demo.enabledEncodings, action.encoding]
        : state.demo.enabledEncodings.filter(
            (encoding) => encoding !== action.encoding,
          );

      return {
        ...state,
        demo: {
          ...state.demo,
          enabledEncodings,
        },
      };
    }
    case "toggleShowOrigin":
      return {
        ...state,
        demo: {
          ...state.demo,
          showOrigin: !state.demo.showOrigin,
        },
      };
    case "toggleShowJsString":
      return {
        ...state,
        demo: {
          ...state.demo,
          showJsString: !state.demo.showJsString,
        },
      };
    case "toggleShowNormalizationForms":
      return {
        ...state,
        demo: {
          ...state.demo,
          showNormalizationForms: !state.demo.showNormalizationForms,
        },
      };
    case "displayInfoOfCodePoint":
      return {
        ...state,
        infoOfCodePoint: action.codePoint,
      };
    case "hideInfoOfCodePoint":
      return { ...state, infoOfCodePoint: undefined };
    case "toggleTextDirection":
      return {
        ...state,
        textDirection: state.textDirection === "ltr" ? "rtl" : "ltr",
      };
    default:
      return state;
  }
}

export default function SourceContext({ children }: SourceContextProps) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_SOURCE_PROPS);

  const setSource = (newSource: string) => {
    dispatch({ type: "setSource", source: newSource });
  };

  const defineCurrentCodePointIndex = (index: number) => {
    dispatch({ type: "defineCurrentCodePointIndex", index });
  };

  const clearCurrentCodePointIndex = () => {
    dispatch({ type: "clearCurrentCodePointIndex" });
  };

  const toggleEncoding = (encoding: Encoding) => {
    dispatch({ type: "toggleEncoding", encoding });
  };

  const toggleShowOrigin = () => {
    dispatch({ type: "toggleShowOrigin" });
  };

  const toggleShowJsString = () => {
    dispatch({ type: "toggleShowJsString" });
  };

  const toggleShowNormalizationForms = () => {
    dispatch({ type: "toggleShowNormalizationForms" });
  };

  const displayInfoOfCodePoint = (codePoint: number) => {
    dispatch({ type: "displayInfoOfCodePoint", codePoint });
  };

  const hideInfoOfCodePoint = () => {
    dispatch({ type: "hideInfoOfCodePoint" });
  };

  const toggleTextDirection = () => {
    dispatch({ type: "toggleTextDirection" });
  };

  return (
    <SourceContextValue value={state}>
      <SourceContextActions
        value={{
          setSource,
          defineCurrentCodePointIndex,
          clearCurrentCodePointIndex,
          toggleEncoding,
          toggleShowOrigin,
          toggleShowJsString,
          toggleShowNormalizationForms,
          displayInfoOfCodePoint,
          hideInfoOfCodePoint,
          toggleTextDirection,
        }}
      >
        {children}
      </SourceContextActions>
    </SourceContextValue>
  );
}
