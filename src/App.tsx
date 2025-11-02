import { Fragment } from "react";
import SourceForm from "./SourceForm.tsx";
import SampleValueGroup from "./SampleValueGroup.tsx";
import OriginDisplay from "./OriginDisplay.tsx";
import JsStringLength from "./JsStringLength.tsx";
import Normalization from "./Normalization.tsx";
import EncodedBytes from "./EncodedBytes.tsx";
import DemoControls from "./DemoControls.tsx";
import { ALL_NORMALIZATION_FORMS } from "./common.ts";
import CharacterInfoContainer from "./CharacterInfoContainer.tsx";
import {
  useDemoEncodings,
  useDemoShowJsString,
  useDemoShowNormalizationForms,
  useDemoShowOrigin,
} from "./SourceContextBase.ts";

export default function App() {
  const [enabledEncodings] = useDemoEncodings();
  const [showOrigin] = useDemoShowOrigin();
  const [showJsString] = useDemoShowJsString();
  const [showNormalizationForms] = useDemoShowNormalizationForms();

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

        <div className="output-group">
          {showOrigin && <OriginDisplay />}
          {showJsString && <JsStringLength />}

          {enabledEncodings.map((encoding) => (
            <Fragment key={encoding}>
              <EncodedBytes key={encoding} encoding={encoding} />
            </Fragment>
          ))}

          {showNormalizationForms &&
            ALL_NORMALIZATION_FORMS.map((form) => (
              <Normalization key={form} form={form} />
            ))}
        </div>
      </main>

      <CharacterInfoContainer />
    </>
  );
}
