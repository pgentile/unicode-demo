import { Fragment } from "react";
import SourceForm from "./SourceForm.tsx";
import SampleValueGroup from "./SampleValueGroup.tsx";
import OriginDisplay from "./OriginDisplay.tsx";
import JsStringLength from "./JsStringLength.tsx";
import Normalization from "./Normalization.tsx";
import EncodedBytes from "./EncodedBytes.tsx";
import DemoControls from "./DemoControls.tsx";
import { useDemoModeProps } from "./DemoModeContextBase.ts";
import {
  ALL_ENCODINGS,
  ALL_NORMALIZATION_FORMS,
  type NormalizationForm,
} from "./common.ts";
import CharacterInfoContainer from "./CharacterInfoContainer.tsx";

export default function App() {
  const { enabledEncodings, showJsString, showNormalizationForms, showOrigin } =
    useDemoModeProps();

  return (
    <>
      <header className="global-header">
        <h1>Unicode demo</h1>
      </header>

      <main>
        <div className="input-group">
          <SourceForm />
          <SampleValueGroup />
        </div>
        <DemoControls />

        <CharacterInfoContainer />

        <div className="output-group">
          {showOrigin && <OriginDisplay />}
          {showJsString && <JsStringLength />}

          {ALL_ENCODINGS.filter((encoding) =>
            enabledEncodings.includes(encoding),
          ).map((encoding) => (
            <Fragment key={encoding}>
              <EncodedBytes key={encoding} encoding={encoding} />
            </Fragment>
          ))}

          {showNormalizationForms &&
            ALL_NORMALIZATION_FORMS.map((form) => (
              <Normalization key={form} form={form as NormalizationForm} />
            ))}
        </div>
      </main>
    </>
  );
}
