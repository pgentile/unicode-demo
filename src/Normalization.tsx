import { type MouseEvent } from "react";
import { useSource } from "./SourceContextBase.ts";
import type { NormalizationForm } from "./common.ts";
import StringCodePointDisplay from "./StringCodePointDisplay.tsx";

export interface NormalizationProps {
  form: NormalizationForm;
}

const FORM_DESCRIPTIONS: Record<NormalizationForm, string> = {
  NFC: "Normalization Form C — Canonical Composition",
  NFD: "Normalization Form D — Canonical Decomposition",
  NFKC: "Normalization Form KC — Compatibility Composition",
  NFKD: "Normalization Form KD — Compatibility Decomposition",
};

export default function Normalization({ form }: NormalizationProps) {
  const [source, setSource] = useSource();
  const normalized = source.normalize(form);

  const onUseNormalizedAsSourceClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setSource(normalized);
  };

  return (
    <section className="output">
      <h2 className="output-title">
        {form}
        <span className="output-detailed-description">
          <span className="hidden">—</span> {FORM_DESCRIPTIONS[form]}
        </span>
      </h2>
      <StringCodePointDisplay value={normalized} />
      <p className="output-use-as-source">
        <a href="#" onClick={onUseNormalizedAsSourceClick}>
          Use it as source
        </a>
      </p>
    </section>
  );
}
