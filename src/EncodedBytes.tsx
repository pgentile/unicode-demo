import { useSource } from "./SourceContextBase.ts";
import { getCodePoints, type Encoding } from "./codePoints.ts";
import ByteSequence from "./ByteSequence.tsx";

export interface EncodedBytesProps {
  encoding: Encoding;
}

export default function EncodedBytes({ encoding }: EncodedBytesProps) {
  const [source] = useSource();

  const codePoints = getCodePoints(source);

  return (
    <section className="output">
      <h2 className="output-title">{encoding.toUpperCase()} encoded</h2>
      <ByteSequence codePoints={codePoints} encoding={encoding} />
    </section>
  );
}
