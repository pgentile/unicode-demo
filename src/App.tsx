import { Activity, lazy, Suspense, type MouseEvent, Fragment } from "react";
import SourceForm from "./SourceForm.tsx";
import SampleValueGroup from "./SampleValueGroup.tsx";
import OriginDisplay from "./OriginDisplay.tsx";
import JsStringLength from "./JsStringLength.tsx";
import Normalization from "./Normalization.tsx";
import {
  useCodePointDisplay,
  useHideCharacterContext,
} from "./CharacterContextBase.ts";
import EncodedBytes from "./EncodedBytes.tsx";
import { createPortal } from "react-dom";
import DemoControls from "./DemoControls.tsx";
import { useDemoModeProps } from "./DemoModeContextBase.ts";
import {
  ALL_ENCODINGS,
  ALL_NORMALIZATION_FORMS,
  type NormalizationForm,
} from "./common.ts";

const CharacterInfo = lazy(() => import("./CharacterInfo.tsx"));

export default function App() {
  const displayCodePoint = useCodePointDisplay();

  const { enabledEncodings, showJsString, showNormalizationForms, showOrigin } =
    useDemoModeProps();

  const hideCharacterContext = useHideCharacterContext();

  const onCharacterInfoCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    hideCharacterContext();
  };

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

        <Activity mode={displayCodePoint ? "visible" : "hidden"}>
          {createPortal(
            <aside className="character-info-container">
              <button
                className="character-info-container-close"
                onClick={onCharacterInfoCloseClick}
              >
                ╳<span className="hidden">Close character info</span>
              </button>
              <Suspense fallback={"Loading character info..."}>
                {displayCodePoint && <CharacterInfo />}
              </Suspense>
            </aside>,
            document.body,
          )}
        </Activity>

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
