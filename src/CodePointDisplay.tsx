import {getCodePoints} from "./codePoints.ts";
import CodePoint from "./CodePoint.tsx";

export interface CodePointDisplay {
    value: string
}

export default function CodePointDisplay({value}: CodePointDisplay) {
    const codePoints = getCodePoints(value);

    return (
        <div className="code-point-display">
            {codePoints.map((codePoint, index) => <CodePoint key={index} codePoint={codePoint}/>)}
        </div>
    );
}