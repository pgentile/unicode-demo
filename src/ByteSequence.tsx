import { encodeTo } from "./codePoints.ts";
import type { Encoding } from "./common.ts";

export interface ByteSequenceProps {
  codePoints: number[];
  encoding: Encoding;
}

export default function ByteSequence({
  codePoints,
  encoding,
}: ByteSequenceProps) {
  const sequence = encodeTo(codePoints, encoding);

  const padding = getPadding(encoding);

  return (
    <div className="unicode-sequence">
      {sequence.map((bytes, index) => (
        <span key={index} className="unicode-bytes">
          {bytesToHex(bytes, padding)}
        </span>
      ))}
    </div>
  );
}

type Padding = 2 | 4 | 8;

function getPadding(encoding: Encoding): Padding {
  switch (encoding) {
    case "UTF-8":
      return 2;
    case "UTF-16":
      return 4;
    case "UTF-32":
      return 8;
    default:
      throw new Error(`Unknown encoding: ${encoding}`);
  }
}

function byteToHex(n: number, padding: Padding): string {
  return "0x" + n.toString(16).toUpperCase().padStart(padding, "0");
}

function bytesToHex(bytes: number[], padding: Padding): string {
  return bytes.map((b) => byteToHex(b, padding)).join(" ");
}
