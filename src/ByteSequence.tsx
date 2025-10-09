export interface ByteSequenceProps {
    sequence: number[][];
}

export default function ByteSequence({sequence}: ByteSequenceProps) {
    return (
        <div className="unicode-sequence">
            {sequence.map((bytes, index) => <span key={index} className="unicode-bytes">{bytesToHex(bytes)}</span>)}
        </div>
    );
}

function byteToHex(n: number): string {
    return "0x" + n.toString(16).toUpperCase().padStart(2, '0');
}

function bytesToHex(bytes: number[]): string {
    return bytes.map(byteToHex).join(" ");
}
