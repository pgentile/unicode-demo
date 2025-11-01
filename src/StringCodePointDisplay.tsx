import { getCodePoints } from "./codePoints.ts";
import CodePointDisplay from "./CodePointDisplay.tsx";

export interface StringCodePointDisplayProps {
  value: string;
}

export default function StringCodePointDisplay({
  value,
}: StringCodePointDisplayProps) {
  const codePoints = getCodePoints(value);

  return <CodePointDisplay codePoints={codePoints} />;
}
