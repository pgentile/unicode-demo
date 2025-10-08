import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CharacterContext from "./CharacterContext.tsx";
import SourceContext from "./SourceContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CharacterContext>
            <SourceContext>
                <App/>
            </SourceContext>
        </CharacterContext>
    </StrictMode>,
)
