import SourceContext from "./SourceContext.tsx";
import SourceForm from "./SourceForm.tsx";
import SampleValueGroup from "./SampleValueGroup.tsx";
import OriginDisplay from "./OriginDisplay.tsx";
import NumberOfCodepoints from "./NumberOfCodepoints.tsx";
import JsStringLength from "./JsStringLength.tsx";
import Normalization, {type NormalizationForm} from "./Normalization.tsx";

export default function App() {
    const normalizationForms: NormalizationForm[] = ["NFC", "NFD", "NFKC", "NFKD"];
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

                {normalizationForms.map(form => (
                    <Normalization key={form} form={form as NormalizationForm}/>
                ))}
            </section>
        </SourceContext>
    );
}
