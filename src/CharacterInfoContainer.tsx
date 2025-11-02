import { Activity, lazy, type MouseEvent, Suspense } from "react";
import { createPortal } from "react-dom";
import { useInfoOfCodePoint } from "./SourceContextBase.ts";

const CharacterInfo = lazy(() => import("./CharacterInfo.tsx"));

export default function CharacterInfoContainer() {
  const [infoOfCodePoint] = useInfoOfCodePoint();

  return (
    <Activity mode={typeof infoOfCodePoint === "number" ? "visible" : "hidden"}>
      {createPortal(<CharacterInfoInnerContainer />, document.body)}
    </Activity>
  );
}

function CharacterInfoInnerContainer() {
  const [, , hideInfoOfCodePoint] = useInfoOfCodePoint();

  const onCharacterInfoCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    hideInfoOfCodePoint();
  };

  return (
    <aside className="character-info-container">
      <button
        className="character-info-container-close"
        onClick={onCharacterInfoCloseClick}
      >
        ╳<span className="hidden">Close character info</span>
      </button>
      <Suspense fallback={<p>Loading character info...</p>}>
        <CharacterInfo />
      </Suspense>
    </aside>
  );
}
