import { getCodePointAsHexa } from "./codePoints.ts";
import { useShowCodePoint } from "./CharacterContextBase.ts";
import type { MouseEvent } from "react";

export interface CodePointDisplayProps {
  codePoints: number[];
  onMouseOverCodePoint?: (_: { index: number; codePoint: number }) => void;
  onMouseOutOfCodePoint?: () => void;
}

export default function CodePointDisplay({
  codePoints,
  onMouseOverCodePoint,
  onMouseOutOfCodePoint,
}: CodePointDisplayProps) {
  return (
    <div className="code-point-display">
      {codePoints.map((codePoint, index) => (
        <CodePoint
          key={index}
          codePoint={codePoint}
          onMouseOver={() => onMouseOverCodePoint?.({ index, codePoint })}
          onMouseOut={() => onMouseOutOfCodePoint?.()}
        />
      ))}
    </div>
  );
}

interface CodePointProps {
  codePoint: number;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

function CodePoint({ codePoint, onMouseOver, onMouseOut }: CodePointProps) {
  const codePointAsHexa = getCodePointAsHexa(codePoint);
  const codePointAsHtmlEntity = `&#x${codePointAsHexa};`;

  return (
    <div
      className="codepoint"
      onMouseOver={() => onMouseOver()}
      onMouseOut={() => onMouseOut()}
    >
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
