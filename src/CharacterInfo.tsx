import { type MouseEvent, use } from "react";
import { useCodePoint } from "./CharacterContextBase.ts";
import CodePoint from "./CodePoint.tsx";
import { getCodePointAsHexa } from "./codePoints.ts";
import { useSource } from "./SourceContextBase.ts";
import ByteSequence from "./ByteSequence.tsx";

const characterNamesPromise: Promise<Map<number, string>> = new Promise(
  (resolve, reject) => {
    async function loadModule() {
      const module = await import("@unicode/unicode-17.0.0/Names");
      return module.default;
    }

    loadModule().then(resolve, reject);
  },
);

const characterCategoriesPromise: Promise<Map<number, string>> = new Promise(
  (resolve, reject) => {
    async function loadModule() {
      const module = await import("@unicode/unicode-17.0.0/General_Category");
      return module.default;
    }

    loadModule().then(resolve, reject);
  },
);

export default function CharacterInfo() {
  const characterNames = use(characterNamesPromise);
  const characterCategories = use(characterCategoriesPromise);
  const codePoint = useCodePoint() ?? 0;
  const [, setSource] = useSource();

  const onUseAsSourceClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSource(String.fromCodePoint(codePoint));
  };

  const characterName = characterNames.get(codePoint);
  const characterCategory = (
    characterCategories.get(codePoint) ?? "-"
  ).replaceAll("_", " ");

  const codePointAsHexa = getCodePointAsHexa(codePoint);
  const codePointDescription = `U+${codePointAsHexa}`;
  const codePointLink = `https://www.compart.com/en/unicode/${codePointDescription}`;
  // const codePointLink = `https://symbl.cc/en/${codePointAsHexa}`;

  return (
    <div className="character-info">
      <h2>About the character</h2>

      <div className="code-point-display">
        <CodePoint codePoint={codePoint} />
      </div>

      <h3>Character abstract name</h3>
      <p>{characterName}</p>

      <h3>General category</h3>
      <p>{characterCategory}</p>

      <h3>UTF-8 encoding</h3>
      <ByteSequence codePoints={[codePoint]} encoding="utf-8" />

      <h3>UTF-16 encoding</h3>
      <ByteSequence codePoints={[codePoint]} encoding="utf-16" />

      <h3>UTF-32 encoding</h3>
      <ByteSequence codePoints={[codePoint]} encoding="utf-32" />

      <p>
        <a href={codePointLink} rel="noopener" target="_blank">
          View more info on compart.com
        </a>
      </p>
      <p>
        <a href="#" onClick={onUseAsSourceClick}>
          Use character as source
        </a>
      </p>
    </div>
  );
}
