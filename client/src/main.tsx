import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#246835",
        },
        secondary: {
            main: "#b727d6"
        }
    },
    typography: {
        fontFamily: "monospace",
        h1: {
            fontSize: 50,
        },
        h3: {
            fontSize: 24,
        }
    }
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </StrictMode>,
)