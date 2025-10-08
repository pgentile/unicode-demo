import type {MouseEvent} from "react";

import CodePointLink from "./CodePointLink.tsx";
import {getCodePointAsHexa} from "./codePoints.ts";
import {useSource} from "./SourceContextBase.ts";

export interface CodePointProps {
    codePoint: number
}

export default function CodePoint({codePoint}: CodePointProps) {
    const [, setSource] = useSource();

    const codePointAsHexa = getCodePointAsHexa(codePoint);
    const codePointAsHtmlEntity = `&#x${codePointAsHexa};`;

    const onCharClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setSource(String.fromCodePoint(codePoint));
    }

    return <div className="codepoint">
        <div className="codepoint-char">
            <a className="codepoint-char-link" href="#" onClick={onCharClick}
               dangerouslySetInnerHTML={{__html: codePointAsHtmlEntity}}></a>
        </div>
        <div className="codepoint-number">
            <CodePointLink codePoint={codePoint}/>
        </div>
    </div>
}
