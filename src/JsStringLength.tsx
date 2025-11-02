import { useSource } from "./SourceContextBase.ts";
import { useDeferredValue } from "react";

export default function JsStringLength() {
  const [source] = useSource();
  const deferredSource = useDeferredValue(source);
  const jsString = escapeJavaScriptString(deferredSource);

  return (
    <section className="output">
      <h2 className="output-title">
        JS{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length"
          target="_blank"
          rel="noopener"
        >
          <code>String: length</code>
        </a>
      </h2>
      <pre className="js-code">
        "{jsString}".length === {deferredSource.length}
      </pre>
    </section>
  );
}

function escapeJavaScriptString(str: string): string {
  return str.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}
