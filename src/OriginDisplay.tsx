import { useSource } from "./SourceContextBase.ts";
import CodePointDisplay from "./CodePointDisplay.tsx";

export default function OriginDisplay() {
  const [source] = useSource();

  return (
    <section className="output">
      <h2 className="output-title">Origin</h2>
      <CodePointDisplay value={source} />
    </section>
  );
}
