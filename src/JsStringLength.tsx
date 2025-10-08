import {useSource} from "./SourceContextBase.ts";

export default function JsStringLength() {
    const [source, ] = useSource();
    const jsString = escapeJavaScriptString(source);

    return (
        <section className="output">
            <h2 className="output-title">
                JS{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length"
                   target="_blank" rel="noopener">
                    <code>String: length</code>
                </a>
            </h2>
            <pre>
                "{jsString}".length === {source.length}
            </pre>
        </section>
    );
}

function escapeJavaScriptString(str: string): string {
    return str.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}
