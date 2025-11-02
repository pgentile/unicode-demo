import { useSource, useTextDirection } from "./SourceContextBase.ts";
import { useId, type MouseEvent } from "react";

export default function SourceForm() {
  const [source, setSource] = useSource();

  const onSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  const sourceInputId = useId();
  const [textDirection, toggleTextDirection] = useTextDirection();

  const onToggleTextDirectionClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleTextDirection();
  };

  const toggleTextDirectionText = "Toggle text direction";
  return (
    <form className="source-section" dir={textDirection}>
      <h2>
        <label htmlFor={sourceInputId}>Source</label>
      </h2>
      <p className="source-input-group">
        <input
          className="source-input"
          id={sourceInputId}
          type="text"
          value={source}
          onChange={onSourceChange}
        />
        <button
          className="text-dir-button"
          title={toggleTextDirectionText}
          onClick={onToggleTextDirectionClick}
        >
          ⇋<span className="hidden"> {toggleTextDirectionText}</span>
        </button>
      </p>
    </form>
  );
}
