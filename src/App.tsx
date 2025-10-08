import SourceContext from "./SourceContext.tsx";
import SourceForm from "./SourceForm.tsx";
import SampleValueGroup from "./SampleValueGroup.tsx";
import OriginDisplay from "./OriginDisplay.tsx";
import NumberOfCodepoints from "./NumberOfCodepoints.tsx";
import JsStringLength from "./JsStringLength.tsx";
import Normalization from "./Normalization.tsx";

export default function App() {
    return (
        <SourceContext>
            <header className="global-header">
                <h1>Unicode demo</h1>
            </header>

            <section className="input-group">
                <SourceForm/>
                <SampleValueGroup/>
            </section>

            <section className="output-group">
                <OriginDisplay/>
                <NumberOfCodepoints/>
                <JsStringLength/>

                {["NFC", "NFD", "NFKC", "NFKD"].map(form => (
                    <Normalization key={form} form={form as "NFC" | "NFD" | "NFKC" | "NFKD"}/>
                ))}
            </section>
        </SourceContext>
    );
}
