import { getCodePoints } from "./codePoints.ts";
import CodePointDisplay, {
  type CodePointDisplayProps,
} from "./CodePointDisplay.tsx";

export interface StringCodePointDisplayProps
  extends Omit<CodePointDisplayProps, "codePoints"> {
  value: string;
}

export default function StringCodePointDisplay({
  value,
  ...props
}: StringCodePointDisplayProps) {
  const codePoints = getCodePoints(value);

  return <CodePointDisplay codePoints={codePoints} {...props} />;
}
