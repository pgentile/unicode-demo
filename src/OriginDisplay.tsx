import { useCurrentCodePointIndex, useSource } from "./SourceContextBase.ts";
import StringCodePointDisplay from "./StringCodePointDisplay.tsx";
import { countCodePoints } from "./codePoints.ts";
import { useDeferredValue } from "react";

export default function OriginDisplay() {
  const [source] = useSource();
  const deferredSource = useDeferredValue(source);
  const [
    currentCodePointIndex,
    defineCurrentCodePointIndex,
    clearCurrentCodePointIndex,
  ] = useCurrentCodePointIndex();

  const onMouseOverCodePoint = ({ index }: { index: number }) => {
    defineCurrentCodePointIndex(index);
  };

  const onMouseOutOfCodePoint = () => clearCurrentCodePointIndex();

  return (
    <section className="output">
      <h2 className="output-title">Origin</h2>
      <StringCodePointDisplay
        value={deferredSource}
        focusAtIndex={currentCodePointIndex ?? undefined}
        onMouseOverCodePoint={onMouseOverCodePoint}
        onMouseOutOfCodePoint={onMouseOutOfCodePoint}
      />
      <p className="number-of-codepoints">
        <b>Number of codepoints:</b> {countCodePoints(deferredSource)}
      </p>
    </section>
  );
}
