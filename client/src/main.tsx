import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createTheme, Theme, ThemeProvider } from "@mui/material"

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: "#246835",
        },
        secondary: {
            main: "#d2d6a8"
        }
    },
    typography: {
        fontFamily: "monospace",
        h1: {
            fontSize: 50,
        },
        h2: {
            fontSize: 35,
        },
        h3: {
            fontSize: 24,
        },
        h4: {
            fontSize: 20,
        },
        h5: {
            fontSize: 10,
        },
    }
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </StrictMode>,
)
