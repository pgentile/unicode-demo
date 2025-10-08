import CodePointLink from "./CodePointLink.tsx";
import {getCodePointAsHexa} from "./codePoints.ts";

export interface CodePointProps {
    codePoint: number
}

export default function CodePoint({codePoint}: CodePointProps) {
    const codePointAsHexa = getCodePointAsHexa(codePoint);
    const codePointAsHtmlEntity = `&#x${codePointAsHexa};`;

    return <div className="codepoint">
        <div className="codepoint-char" dangerouslySetInnerHTML={{__html: codePointAsHtmlEntity}}></div>
        <div className="codepoint-number">
            <CodePointLink codePoint={codePoint} />
        </div>
    </div>
}
