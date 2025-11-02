import { useCurrentCodePointIndex, useSource } from "./SourceContextBase.ts";
import { getCodePoints } from "./codePoints.ts";
import ByteSequence from "./ByteSequence.tsx";
import type { Encoding } from "./common.ts";
import { useDeferredValue } from "react";

export interface EncodedBytesProps {
  encoding: Encoding;
}

export default function EncodedBytes({ encoding }: EncodedBytesProps) {
  const [source] = useSource();
  const deferredSource = useDeferredValue(source);
  const codePoints = getCodePoints(deferredSource);
  const [
    focusAtIndex,
    defineCurrentCodePointIndex,
    clearCurrentCodePointIndex,
  ] = useCurrentCodePointIndex();

  const onMouseOverCodePoints = ({ index }: { index: number }) => {
    defineCurrentCodePointIndex(index);
  };

  const onMouseOutOfCodePoints = () => {
    clearCurrentCodePointIndex();
  };

  return (
    <section className="output">
      <h2 className="output-title">{encoding} encoded</h2>
      <ByteSequence
        codePoints={codePoints}
        encoding={encoding}
        focusAtIndex={focusAtIndex ?? undefined}
        onMouseOverCodePoints={onMouseOverCodePoints}
        onMouseOutOfCodePoints={onMouseOutOfCodePoints}
      />
    </section>
  );
}
