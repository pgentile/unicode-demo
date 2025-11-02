import { getCodePointAsHexa } from "./codePoints.ts";
import { useShowCodePoint } from "./CharacterContextBase.ts";
import type { MouseEvent } from "react";
import { classNames } from "./common.ts";

export interface CodePointDisplayProps {
  codePoints: number[];
  focusAtIndex?: number;
  onMouseOverCodePoint?: (_: { index: number; codePoint: number }) => void;
  onMouseOutOfCodePoint?: () => void;
}

export default function CodePointDisplay({
  codePoints,
  focusAtIndex,
  onMouseOverCodePoint,
  onMouseOutOfCodePoint,
}: CodePointDisplayProps) {
  return (
    <div className="code-point-display">
      {codePoints.map((codePoint, index) => (
        <CodePoint
          key={index}
          codePoint={codePoint}
          focused={index === focusAtIndex}
          onMouseOver={() => onMouseOverCodePoint?.({ index, codePoint })}
          onMouseOut={() => onMouseOutOfCodePoint?.()}
        />
      ))}
    </div>
  );
}

interface CodePointProps {
  codePoint: number;
  focused?: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

function CodePoint({
  codePoint,
  focused,
  onMouseOver,
  onMouseOut,
}: CodePointProps) {
  const codePointAsHexa = getCodePointAsHexa(codePoint);
  const codePointAsHtmlEntity = `&#x${codePointAsHexa};`;

  return (
    <div
      className={classNames("codepoint", focused && "focused")}
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
