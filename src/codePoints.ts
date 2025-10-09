export function getCodePoints(str: string): number[] {
  const codePoints: number[] = [];

  let i = 0;
  while (i < str.length) {
    const codePoint = str.codePointAt(i);
    if (codePoint) {
      codePoints.push(codePoint);
      i += codePoint > 0xffff ? 2 : 1; // Move to the next character (2 for surrogate pairs)
    }
  }

  return codePoints;
}

export function countCodePoints(str: string): number {
  return getCodePoints(str).length;
}

export function getCodePointAsHexa(codePoint: number): string {
  return codePoint.toString(16).padStart(4, "0").toUpperCase();
}

export type Encoding = "utf-8" | "utf-16";

export function encodeTo(
  codePoints: readonly number[],
  encoding: Encoding,
): number[][] {
  switch (encoding) {
    case "utf-8":
      return encodeToUtf8(codePoints);
    case "utf-16":
      return encodeToUtf16(codePoints);
    default:
      throw new Error(`Unknown encoding: ${encoding}`);
  }
}

function encodeToUtf8(codePoints: readonly number[]): number[][] {
  const sequences: number[][] = [];

  const textEncoder = new TextEncoder();

  for (const codePoint of codePoints) {
    const codePointBytes: number[] = [];
    for (const byte of textEncoder
      .encode(String.fromCodePoint(codePoint))
      .values()) {
      codePointBytes.push(byte);
    }
    sequences.push(codePointBytes);
  }

  return sequences;
}

function encodeToUtf16(codePoints: readonly number[]): number[][] {
  const sequences: number[][] = [];

  for (const codePoint of codePoints) {
    if (codePoint <= 0xffff) {
      sequences.push([codePoint]);
    } else {
      const highSurrogate = 0xd800 + ((codePoint - 0x10000) >>> 10);
      const lowSurrogate = 0xdc00 + ((codePoint - 0x10000) & 0b1111111111);
      sequences.push([highSurrogate, lowSurrogate]);
    }
  }

  return sequences;
}
