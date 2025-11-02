import { getCodePointAsHexa } from "./codePoints.ts";
import { useShowCodePoint } from "./CharacterContextBase.ts";
import type { MouseEvent } from "react";

export interface CodePointProps {
  codePoint: number;
}

export default function CodePoint({ codePoint }: CodePointProps) {
  const codePointAsHexa = getCodePointAsHexa(codePoint);
  const codePointAsHtmlEntity = `&#x${codePointAsHexa};`;

  return (
    <div className="codepoint">
      <div
        className="codepoint-char"
        dangerouslySetInnerHTML={{ __html: codePointAsHtmlEntity }}
      ></div>
      <div className="codepoint-number">
        <CodePointLink codePoint={codePoint} />
      </div>
    </div>
  );
}

interface CodePointLinkProps {
  codePoint: number;
}

function CodePointLink({ codePoint }: CodePointLinkProps) {
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
