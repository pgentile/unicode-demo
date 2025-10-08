import {createContext, useContext} from "react";

export interface CharacterContextValueProps {
    display: boolean,
    codePoint?: number,
}

export const CharacterContextValue = createContext<CharacterContextValueProps>({
    display: false,
});

export interface CharacterContextActionsProps {
    showCodePoint: (codePoint: number) => void,
    hide: () => void,
}

function doNothing() {
}

export const CharacterContextActions = createContext<CharacterContextActionsProps>({
    showCodePoint: doNothing,
    hide: doNothing,
});

export function useCodePoint(): number | null {
    const {codePoint} = useContext(CharacterContextValue);
    return codePoint ?? null;
}

export function useCodePointDisplay(): boolean {
    const {display} = useContext(CharacterContextValue);
    return display;
}

export function useShowCodePoint(): CharacterContextActionsProps["showCodePoint"] {
    const {showCodePoint} = useContext(CharacterContextActions);
    return showCodePoint;
}

export function useHideCharacterContext(): CharacterContextActionsProps["hide"] {
    const {hide} = useContext(CharacterContextActions);
    return hide;
}
