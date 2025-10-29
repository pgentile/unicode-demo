import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CharacterContext from "./CharacterContext.tsx";
import SourceContext from "./SourceContext.tsx";
import DemoModeContext from "./DemoModeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CharacterContext>
      <SourceContext>
        <DemoModeContext>
          <App />
        </DemoModeContext>
      </SourceContext>
    </CharacterContext>
  </StrictMode>,
);
