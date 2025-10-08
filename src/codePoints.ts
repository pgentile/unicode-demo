export function getCodePoints(str: string): number[] {
    const codePoints: number[] = [];

    let i = 0;
    while (i < str.length) {
        const codePoint = str.codePointAt(i);
        if (codePoint) {
            codePoints.push(codePoint);
            // TODO Check for surrogates, if they are valid?
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
