import { Activity, lazy, type MouseEvent, Suspense } from "react";
import {
  useCodePointDisplay,
  useHideCharacterContext,
} from "./CharacterContextBase.ts";
import { createPortal } from "react-dom";

const CharacterInfo = lazy(() => import("./CharacterInfo.tsx"));

export default function CharacterInfoContainer() {
  const displayCodePoint = useCodePointDisplay();

  return (
    <Activity mode={displayCodePoint ? "visible" : "hidden"}>
      {createPortal(<CharacterInfoInnerContainer />, document.body)}
    </Activity>
  );
}

function CharacterInfoInnerContainer() {
  const hideCharacterContext = useHideCharacterContext();

  const onCharacterInfoCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    hideCharacterContext();
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
