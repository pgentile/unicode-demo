import SampleValue from "./SampleValue.tsx";

export default function SampleValueGroup() {
  const sampleValues = [
    "ABC",
    "Hélice",
    "Hélice", // Example with combining character for the é
    "ﬃ",
    "😱",
    "🧑‍🧑‍🧒‍🧒",
    "🇺🇸",
    "é",
    "é",
    "👍",
    "👍🏽",
    "Ǚ",
    "𝕭𝖔𝖔𝖒",
    "œ",
    "ß",
    "①②③",
    "◌̈",
    "🙋‍♂️",
    "👩🏾‍🦳",
    "🇫🇷",
    "🏳️‍🌈",
    "🏴‍☠️",
    "👩‍🍼",
    "👩🏻‍🍼",
    "💇🏻‍♂️",
    "↗️",
    "❤️‍🔥",
    "🥇",
    "ﬁ",
    "Україна",
    "불",
    "불",
    "자모",
    "㍍㌔㌢",
    "が",
    "ئ",
    "בּ",
  ];

  return (
    <div className="source-samples">
      <p>Please try with the following examples:</p>
      <p className="samples">
        {sampleValues.map((sampleValue) => (
          <SampleValue key={sampleValue} sampleValue={sampleValue} />
        ))}
      </p>
    </div>
  );
}
