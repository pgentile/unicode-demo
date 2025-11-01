import { useSource } from "./SourceContextBase.ts";
import StringCodePointDisplay from "./StringCodePointDisplay.tsx";
import { countCodePoints } from "./codePoints.ts";

export default function OriginDisplay() {
  const [source] = useSource();

  return (
    <section className="output">
      <h2 className="output-title">Origin</h2>
      <StringCodePointDisplay value={source} />
      <p className="number-of-codepoints">
        <b>Number of codepoints:</b> {countCodePoints(source)}
      </p>
    </section>
  );
}
