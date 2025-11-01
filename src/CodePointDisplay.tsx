import { getCodePoints } from "./codePoints.ts";
import CodePoint from "./CodePoint.tsx";

export interface CodePointDisplay {
  value?: string;
  codePoints?: number[];
}

export default function CodePointDisplay({
  value,
  codePoints,
}: CodePointDisplay) {
  const realCodePoints = codePoints ?? getCodePoints(value ?? "");

  return (
    <div className="code-point-display">
      {realCodePoints.map((codePoint, index) => (
        <CodePoint key={index} codePoint={codePoint} />
      ))}
    </div>
  );
}
