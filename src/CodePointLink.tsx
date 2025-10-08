import type {MouseEvent} from "react";
import {getCodePointAsHexa} from "./codePoints.ts";
import {useShowCodePoint} from "./CharacterContextBase.ts";

export interface CodePointLinkProps {
    codePoint: number
}

export default function CodePointLink({codePoint}: CodePointLinkProps) {
    const showCodePoint = useShowCodePoint();

    const codePointAsHexa = getCodePointAsHexa(codePoint);
    const codePointDescription = `U+${codePointAsHexa}`;

    const onShowCodePointClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        showCodePoint(codePoint);
    };

    return (
        <a href="#" onClick={onShowCodePointClick}>
            {codePointDescription}
        </a>
    );
}