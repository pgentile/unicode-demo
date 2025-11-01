import { Activity, type MouseEvent, use } from "react";
import { useCodePoint } from "./CharacterContextBase.ts";
import { getCodePointAsHexa } from "./codePoints.ts";
import { useSource } from "./SourceContextBase.ts";
import ByteSequence from "./ByteSequence.tsx";
import { useDemoModeProps } from "./DemoModeContextBase.ts";
import { ALL_ENCODINGS } from "./common.ts";
import CodePointDisplay from "./CodePointDisplay.tsx";

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

const bidiClassesPromise: Promise<Map<number, string>> = new Promise(
  (resolve, reject) => {
    async function loadModule() {
      const module = await import("@unicode/unicode-17.0.0/Bidi_Class");
      return module.default;
    }

    loadModule().then(resolve, reject);
  },
);

const lowercaseMappingPromise: Promise<Map<number, number>> = new Promise(
  (resolve, reject) => {
    async function loadModule() {
      const module = await import(
        "@unicode/unicode-17.0.0/Simple_Case_Mapping/Lowercase/code-points"
      );
      return module.default;
    }

    loadModule().then(resolve, reject);
  },
);

const uppercaseMappingPromise: Promise<Map<number, number>> = new Promise(
  (resolve, reject) => {
    async function loadModule() {
      const module = await import(
        "@unicode/unicode-17.0.0/Simple_Case_Mapping/Uppercase/code-points"
      );
      return module.default;
    }

    loadModule().then(resolve, reject);
  },
);

export default function CharacterInfo() {
  const characterNames = use(characterNamesPromise);
  const characterCategories = use(characterCategoriesPromise);
  const bidiClasses = use(bidiClassesPromise);
  const lowercaseMapping = use(lowercaseMappingPromise);
  const uppercaseMapping = use(uppercaseMappingPromise);

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

  const bidiClass = (bidiClasses.get(codePoint) ?? "-").replaceAll("_", " ");

  const codePointAsHexa = getCodePointAsHexa(codePoint);
  const codePointDescription = `U+${codePointAsHexa}`;
  const codePointLink = `https://www.compart.com/en/unicode/${codePointDescription}`;
  // const codePointLink = `https://symbl.cc/en/${codePointAsHexa}`;

  const lowerCaseCodePoint = lowercaseMapping.get(codePoint);
  const upperCaseCodePoint = uppercaseMapping.get(codePoint);

  const { enabledEncodings } = useDemoModeProps();

  return (
    <div className="character-info">
      <h2>About the character</h2>

      <div className="character-info-codepoint">
        <CodePointDisplay codePoints={[codePoint]} />
      </div>

      <h3>Character abstract name</h3>
      <p>{characterName}</p>

      <h3>General category</h3>
      <p>{characterCategory}</p>

      <h3>Bidi class</h3>
      <p>{bidiClass}</p>

      {ALL_ENCODINGS.map((encoding) => (
        <Activity
          key={encoding}
          mode={enabledEncodings.includes(encoding) ? "visible" : "hidden"}
        >
          <h3>{encoding} encoding</h3>
          <ByteSequence codePoints={[codePoint]} encoding={encoding} />
        </Activity>
      ))}

      {lowerCaseCodePoint && (
        <>
          <h3>Lowercase mapping</h3>
          <CodePointDisplay codePoints={[lowerCaseCodePoint]} />
        </>
      )}

      {upperCaseCodePoint && (
        <>
          <h3>Uppercase mapping</h3>
          <CodePointDisplay codePoints={[upperCaseCodePoint]} />
        </>
      )}

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
