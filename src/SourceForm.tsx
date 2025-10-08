import {useSource} from "./SourceContextBase.ts";
import {useId} from "react";

export default function SourceForm() {
    const [source, setSource] = useSource();

    const onSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSource(event.target.value);
    }

    const sourceInputId = useId();

    return (
        <form className="source-section">
            <h2><label htmlFor={sourceInputId}>Source</label></h2>
            <p><input className="source-input" id={sourceInputId} type="text" value={source} onChange={onSourceChange}/></p>
        </form>
    );
}
