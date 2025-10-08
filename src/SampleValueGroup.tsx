import SampleValue from "./SampleValue.tsx";

export default function SampleValueGroup() {

    const sampleValues = [
        "Hello, World!",
        "Україна",
        "Hélice",
        "Hélice", // Example with combining character for the é
        "âǙ", "😱", "🙋‍♂️👩🏾‍🦳", "é", "자모", "𝕭𝖔𝖔𝖒", "œ", "ß", "㍍㌔㌢", "①②③", "◌̈", "🇺🇸", "🏳️‍🌈", "👩‍🍼", "👩🏻‍🍼", "💇🏻‍♂️", "↗️", "🧑‍🧑‍🧒‍🧒", "🚾", "❤️‍🔥", "🥇", "🌘", "🔵", "🔈", "🏴‍☠️", "ﬁ", "ﬃ", "が", "ئ", "בּ"
    ];

    return (
        <div className="source-samples">
            <p>Please try with the following examples:</p>
            <p className="samples">
                {sampleValues.map(sampleValue => <SampleValue key={sampleValue} sampleValue={sampleValue}/>)}
            </p>
        </div>
    );
}
