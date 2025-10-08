import {getCodePointAsHexa} from "./codePoints.ts";

export interface CodePointLinkProps {
    codePoint: number
}

export default function CodePointLink({codePoint}: CodePointLinkProps) {
    const codePointAsHexa = getCodePointAsHexa(codePoint);
    const codePointDescription = `U+${codePointAsHexa}`;
    const codePointLink = `https://www.compart.com/en/unicode/${codePointDescription}`;
    // const codePointLink = `https://symbl.cc/en/${codePointAsHexa}`;

    return (
        <a href={codePointLink} target="_blank" rel="noopener">
            {codePointDescription}
        </a>
    );
}