import { useSource } from "./SourceContextBase.ts";
import type { MouseEvent } from "react";

const SAMPLE_VALUES: readonly string[] = [
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
  "Hello Tech Day",
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
  "🏄🏽‍♀️",
  "🏃🏿‍♂️",
  "🚴🏻‍♂️",
  "⚽️",
  "↗️",
  "❤️‍🔥",
  "🥇",
  "ﬁ",
  "Україна",
  "불",
  "불",
  "어머니",
  "㍍㌔㌢",
  "が",
  "ئ",
  "בּ",
  "𓀃",
];

export default function SampleValueGroup() {
  return (
    <div className="source-samples">
      <p className="please-try">Please try with the following examples:</p>
      <ul className="samples">
        {SAMPLE_VALUES.map((sampleValue, index) => (
          <SampleValue key={index} sampleValue={sampleValue} />
        ))}
      </ul>
    </div>
  );
}

interface SampleValueProps {
  sampleValue: string;
}

function SampleValue({ sampleValue }: SampleValueProps) {
  const [, setSource] = useSource();

  const onSampleDataClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSource(sampleValue);
  };

  return (
    <li className="sample-value">
      <a href="#" onClick={onSampleDataClick}>
        {sampleValue}
      </a>
    </li>
  );
}
