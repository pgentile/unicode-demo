import { useDemoModeActions, useDemoModeProps } from "./DemoModeContextBase.ts";
import { ALL_ENCODINGS } from "./common.ts";
import { Fragment } from "react";

export default function DemoControls() {
  const { enabledEncodings, showJsString, showNormalizationForms, showOrigin } =
    useDemoModeProps();

  const {
    toggleEncoding,
    toggleJsString,
    toggleNormalizationForms,
    toggleOrigin,
  } = useDemoModeActions();

  return (
    <section className="demo-controls">
      <form className="demo-controls-form">
        <p>
          <b>Demo controls</b>
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              checked={showOrigin}
              onClick={() => toggleOrigin()}
            />{" "}
            Show origin
          </label>
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              checked={showJsString}
              onClick={() => toggleJsString()}
            />{" "}
            Show JS
          </label>
        </p>
        <p>
          Show encodings:{" "}
          {ALL_ENCODINGS.map((encoding) => (
            <Fragment key={encoding}>
              {" "}
              <label>
                <input
                  type="checkbox"
                  checked={enabledEncodings.includes(encoding)}
                  onClick={() => toggleEncoding(encoding)}
                />{" "}
                {encoding.toUpperCase()}
              </label>
            </Fragment>
          ))}
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              checked={showNormalizationForms}
              onClick={() => toggleNormalizationForms()}
            />{" "}
            Show normalization forms
          </label>
        </p>
      </form>
    </section>
  );
}
