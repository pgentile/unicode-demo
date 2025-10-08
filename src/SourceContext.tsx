import {type ReactNode, useState} from "react";

import {SourceContextValue, SourceContextActions} from "./SourceContextBase.ts";

export interface SourceContextProps {
    children: ReactNode
}

export default function SourceContext({children}: SourceContextProps) {
    const [source, setSource] = useState("");

    return (
        <SourceContextValue value={source}>
            <SourceContextActions value={setSource}>
                {children}
            </SourceContextActions>
        </SourceContextValue>
    );
}
