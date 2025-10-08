import {createContext, useContext} from "react";

export const SourceContextValue = createContext<string>("");

export type SetSourceFunction = (newSource: string) => void;

export const SourceContextActions = createContext<SetSourceFunction>(() => {
});

export function useSource(): [string, SetSourceFunction] {
    const source = useContext(SourceContextValue);
    const setSource = useContext(SourceContextActions);
    return [source, setSource];
}
