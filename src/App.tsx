import {Activity, lazy, Suspense} from "react";
import SourceForm from "./SourceForm.tsx";
import SampleValueGroup from "./SampleValueGroup.tsx";
import OriginDisplay from "./OriginDisplay.tsx";
import NumberOfCodepoints from "./NumberOfCodepoints.tsx";
import JsStringLength from "./JsStringLength.tsx";
import Normalization, {type NormalizationForm} from "./Normalization.tsx";
import {useCodePointDisplay} from "./CharacterContextBase.ts";
import EncodedBytes from "./EncodedBytes.tsx";
import {createPortal} from "react-dom";

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

                <Activity mode={displayCodePoint ? "visible" : "hidden"}>
                    {createPortal(<aside className="character-info-container">
                        <Suspense fallback={"Loading character info..."}>
                            {displayCodePoint && <CharacterInfo/>}
                        </Suspense>
                    </aside>, document.body)}
                </Activity>

                <div className="output-group">
                    <OriginDisplay/>
                    <NumberOfCodepoints/>
                    <JsStringLength/>
                    <EncodedBytes encoding="utf-8"/>
                    <EncodedBytes encoding="utf-16"/>

                    {normalizationForms.map(form => (
                        <Normalization key={form} form={form as NormalizationForm}/>
                    ))}
                </div>
            </main>
        </>
    );
}
