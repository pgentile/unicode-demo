import {Activity, type MouseEvent} from "react";
import {useSource} from "./SourceContextBase.ts";
import CodePointDisplay from "./CodePointDisplay.tsx";

export type NormalizationForm = "NFC" | "NFD" | "NFKC" | "NFKD";

export interface NormalizationProps {
    form: NormalizationForm
}

const FORM_DESCRIPTIONS: Record<NormalizationForm, string> = {
    "NFC": "Normalization Form C — Canonical Composition",
    "NFD": "Normalization Form D — Canonical Decomposition",
    "NFKC": "Normalization Form KC — Compatibility Composition",
    "NFKD": "Normalization Form KD — Compatibility Decomposition"
};

export default function Normalization({form}: NormalizationProps) {
    const [source, setSource] = useSource();
    const normalized = source.normalize(form);

    const onUseNormalizedAsSourceClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setSource(normalized);
    };

    return (

        <section className="output">
            <h2 className="output-title">
                {form}
                <span className="output-detailed-description">
                <span className="hidden">—</span> {FORM_DESCRIPTIONS[form]}</span>
            </h2>
            <Activity mode={normalized ? "visible" : "hidden"}>
                <CodePointDisplay value={normalized}/>
                <p className="output-use-as-source">
                    <a href="#" onClick={onUseNormalizedAsSourceClick}>Use it as source</a>
                </p>
            </Activity>
        </section>
    );
}
