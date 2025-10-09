import { useSource } from "./SourceContextBase.ts";
import { countCodePoints } from "./codePoints.ts";

export default function NumberOfCodepoints() {
  const [source] = useSource();
  const numberOfCodepoints = countCodePoints(source);

  return (
    <section className="output">
      <h2 className="output-title">Number of codepoints</h2>
      <p id="output-codepoints-count" className="output-result">
        {numberOfCodepoints}
      </p>
    </section>
  );
}
