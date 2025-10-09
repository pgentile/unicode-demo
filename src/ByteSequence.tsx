import { encodeTo, type Encoding } from "./codePoints.ts";

export interface ByteSequenceProps {
  codePoints: number[];
  encoding: Encoding;
}

export default function ByteSequence({
  codePoints,
  encoding,
}: ByteSequenceProps) {
  const sequence = encodeTo(codePoints, encoding);
  const padding = encoding === "utf-16" ? 4 : 2;

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

function byteToHex(n: number, padding: number): string {
  return "0x" + n.toString(16).toUpperCase().padStart(padding, "0");
}

function bytesToHex(bytes: number[], padding: number): string {
  return bytes.map((b) => byteToHex(b, padding)).join(" ");
}
