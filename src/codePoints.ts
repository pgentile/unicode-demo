export function getCodePoints(str: string): number[] {
    const codePoints: number[] = [];

    let i = 0;
    while (i < str.length) {
        const codePoint = str.codePointAt(i);
        if (codePoint) {
            codePoints.push(codePoint);
            i += codePoint > 0xFFFF ? 2 : 1; // Move to the next character (2 for surrogate pairs)
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

export function encodeTo(codePoints: number[], encoding: Encoding): number[][] {
    switch (encoding) {
        case "utf-8":
            return encodeToUtf8(codePoints);
        case "utf-16":
            return encodeToUtf16(codePoints);
        default:
            throw new Error(`Unknown encoding: ${encoding}`);
    }
}

function encodeToUtf8(codePoints: number[]): number[][] {
    const sequences: number[][] = [];

    const textEncoder = new TextEncoder();

    for (const codePoint of codePoints) {
        const codePointBytes: number[] = [];
        for (const byte of textEncoder.encode(String.fromCodePoint(codePoint)).values()) {
            codePointBytes.push(byte);
        }
        sequences.push(codePointBytes);
    }

    return sequences;
}

function encodeToUtf16(codePoints: number[]): number[][] {
    const sequences: number[][] = [];

    for (const codePoint of codePoints) {
        const codePointBytes: number[] = [];

        if (codePoint <= 0xFFFF) {
            codePointBytes.push((codePoint >> 8) & 0xFF, codePoint & 0xFF);
        } else {
            const highSurrogate = 0xD800 + ((codePoint - 0x10000) >>> 10);
            const lowSurrogate = 0xDC00 + ((codePoint - 0x10000) & 0b1111111111);
            codePoints.push(
                (highSurrogate >> 8) & 0xFF,
                highSurrogate & 0xFF,
                (lowSurrogate >> 8) & 0xFF,
                lowSurrogate & 0xFF
            );
        }

        sequences.push(codePointBytes);
    }

    console.info("Got this code points:", codePoints);
    console.info("  > Got this output sequence:", sequences);

    return sequences;
}
