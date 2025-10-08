import {lazy, Suspense} from "react";
import SourceForm from "./SourceForm.tsx";
import SampleValueGroup from "./SampleValueGroup.tsx";
import OriginDisplay from "./OriginDisplay.tsx";
import NumberOfCodepoints from "./NumberOfCodepoints.tsx";
import JsStringLength from "./JsStringLength.tsx";
import Normalization, {type NormalizationForm} from "./Normalization.tsx";
import {useCodePointDisplay} from "./CharacterContextBase.ts";

const CharacterInfo = lazy(() => import("./CharacterInfo.tsx"));

export default function App() {
    const displayCodePoint = useCodePointDisplay();
    const normalizationForms: NormalizationForm[] = ["NFC", "NFD", "NFKC", "NFKD"];
    return (
        <>
            <header className="global-header">
                <h1>Unicode demo</h1>
            </header>

            <main>
                <div className="input-group">
                    <SourceForm/>
                    <SampleValueGroup/>
                </div>

                <Suspense fallback={"Loading character info..."}>
                    {displayCodePoint && <CharacterInfo/>}
                </Suspense>

                <div className="output-group">
                    <OriginDisplay/>
                    <NumberOfCodepoints/>
                    <JsStringLength/>

                    {normalizationForms.map(form => (
                        <Normalization key={form} form={form as NormalizationForm}/>
                    ))}
                </div>
            </main>
        </>
    );
}
