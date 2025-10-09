import {
  CharacterContextActions,
  CharacterContextValue,
  type CharacterContextValueProps,
  type CharacterContextActionsProps,
} from "./CharacterContextBase.ts";
import { type ReactNode, useState } from "react";

export interface CharacterContextProps {
  children: ReactNode;
}

export default function CharacterContext({ children }: CharacterContextProps) {
  const [characterContextProps, setCharacterContextProps] =
    useState<CharacterContextValueProps>({
      display: false,
    });

  function hide() {
    setCharacterContextProps((currentState) => ({
      ...currentState,
      display: false,
    }));
  }

  function showCodePoint(codePoint: number) {
    setCharacterContextProps({
      display: true,
      codePoint,
    });
  }

  const actions: CharacterContextActionsProps = {
    hide,
    showCodePoint,
  };

  return (
    <CharacterContextValue value={characterContextProps}>
      <CharacterContextActions value={actions}>
        {children}
      </CharacterContextActions>
    </CharacterContextValue>
  );
}
