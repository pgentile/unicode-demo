import { useSource } from "./SourceContextBase.ts";
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

  return (
    <section className="output">
      <h2 className="output-title">{encoding} encoded</h2>
      <ByteSequence codePoints={codePoints} encoding={encoding} />
    </section>
  );
}
