import CodePoint from "./CodePoint.tsx";

export interface CodePointDisplayProps {
  codePoints: number[];
}

export default function CodePointDisplay({
  codePoints,
}: CodePointDisplayProps) {
  return (
    <div className="code-point-display">
      {codePoints.map((codePoint, index) => (
        <CodePoint key={index} codePoint={codePoint} />
      ))}
    </div>
  );
}
