import { ALL_ENCODINGS } from "./common.ts";
import { Fragment } from "react";
import {
  useDemoEncodings,
  useDemoShowJsString,
  useDemoShowNormalizationForms,
  useDemoShowOrigin,
} from "./SourceContextBase.ts";

export default function DemoControls() {
  const [enabledEncodings, toggleEncoding] = useDemoEncodings();
  const [showJsString, toggleJsString] = useDemoShowJsString();
  const [showNormalizationForms, toggleNormalizationForms] =
    useDemoShowNormalizationForms();
  const [showOrigin, toggleOrigin] = useDemoShowOrigin();

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
              name="origin"
              checked={showOrigin}
              onChange={() => toggleOrigin()}
            />{" "}
            Show origin
          </label>
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              name="js-string"
              checked={showJsString}
              onChange={() => toggleJsString()}
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
                  name={"encoding-" + encoding}
                  checked={enabledEncodings.includes(encoding)}
                  onChange={() => toggleEncoding(encoding)}
                />{" "}
                {encoding}
              </label>
            </Fragment>
          ))}
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              name="normalization-forms"
              checked={showNormalizationForms}
              onChange={() => toggleNormalizationForms()}
            />{" "}
            Show normalization forms
          </label>
        </p>
      </form>
    </section>
  );
}
