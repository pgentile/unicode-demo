import { useSource } from "./SourceContextBase.ts";
import { getCodePoints } from "./codePoints.ts";
import ByteSequence from "./ByteSequence.tsx";
import type { Encoding } from "./common.ts";

export interface EncodedBytesProps {
  encoding: Encoding;
}

export default function EncodedBytes({ encoding }: EncodedBytesProps) {
  const [source] = useSource();

  const codePoints = getCodePoints(source);

  return (
    <section className="output">
      <h2 className="output-title">{encoding} encoded</h2>
      <ByteSequence codePoints={codePoints} encoding={encoding} />
    </section>
  );
}
