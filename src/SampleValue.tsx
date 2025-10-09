import type { MouseEvent } from "react";
import { useSource } from "./SourceContextBase.ts";

export interface SampleValueProps {
  sampleValue: string;
}

export default function SampleValue({ sampleValue }: SampleValueProps) {
  const [, setSource] = useSource();

  const onSampleDataClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSource(sampleValue);
  };

  return (
    <span className="sample-value">
      <a href="#" onClick={onSampleDataClick}>
        {sampleValue}
      </a>
    </span>
  );
}
