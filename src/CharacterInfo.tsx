import {type MouseEvent, use} from "react";
import {useCodePoint, useHideCharacterContext} from "./CharacterContextBase.ts";
import CodePoint from "./CodePoint.tsx";
import {encodeTo, getCodePointAsHexa} from "./codePoints.ts";
import {useSource} from "./SourceContextBase.ts";
import ByteSequence from "./ByteSequence.tsx";


const characterNamesPromise: Promise<Map<number, string>> = new Promise((resolve, reject) => {
    async function loadCharacterNames() {
        const module = await import("@unicode/unicode-17.0.0/Names");
        return module.default;
    }

    loadCharacterNames().then(resolve, reject);
});

// FIXME Add encoding in UTF-8, UTF-16, UTF-32
// Display surrogate pairs properly

export default function CharacterInfo() {
    const characterNames = use(characterNamesPromise);
    const codePointOrNull = useCodePoint();
    const codePoint = codePointOrNull ?? 0;
    const hide = useHideCharacterContext();
    const [, setSource] = useSource();

    const onCloseClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        hide();
    };

    const onUseAsSourceClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setSource(String.fromCodePoint(codePoint));
    };

    const characterName = characterNames.get(codePoint);

    const codePointAsHexa = getCodePointAsHexa(codePoint);
    const codePointDescription = `U+${codePointAsHexa}`;
    const codePointLink = `https://www.compart.com/en/unicode/${codePointDescription}`;
    // const codePointLink = `https://symbl.cc/en/${codePointAsHexa}`;

    const utf8Sequence = encodeTo([codePoint], "utf-8");
    const utf16Sequence = encodeTo([codePoint], "utf-16");

    return (
        <div className="character-info">
            <h2>About the character</h2>

            <div className="code-point-display">
                <CodePoint codePoint={codePoint}/>
            </div>

            <h3>Character abstract name</h3>

            <p>{characterName}</p>

            <h3>UTF-8 encoding</h3>
            <ByteSequence sequence={utf8Sequence} />

            <h3>UTF-16 encoding</h3>
            <ByteSequence sequence={utf16Sequence} />

            <p><a href={codePointLink} rel="noopener" target="_blank">View more info on compart.com</a></p>
            <p><a href="#" onClick={onUseAsSourceClick}>Use character as source</a></p>
            <p><a href="#" onClick={onCloseClick}>Close character info</a></p>
        </div>
    );
}