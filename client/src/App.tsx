import './App.css'
import background from "/background.jpg"
import { Container } from "@mui/material"
import Homepage from "./Pages/Homepage.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Algebra from "./Pages/Algebra.tsx"
import Calculus from "./Pages/Calculus.tsx"
import Geometry from "./Pages/Geometry.tsx"
import NumberTheory from "./Pages/NumberTheory.tsx"
import Others from "./Pages/Others.tsx"
import ProbAndStats from "./Pages/ProbAndStats.tsx"

function App() {

    return (
        <Container
            className="background" style={{backgroundImage: `url(${background})`}}
            disableGutters="false" maxWidth="false"
            sx={{minWidth: 1680}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/algebra" element={<Algebra/>}/>
                    <Route path="/calculus" element={<Calculus/>}/>
                    <Route path="geometry" element={<Geometry/>}/>
                    <Route path="numbertheory" element={<NumberTheory/>}/>
                    <Route path="probandstats" element={<ProbAndStats/>}/>
                    <Route path="others" element={<Others/>}/>
                    <Route path="/" element={<Homepage/>}/>
                    <Route index element={<Homepage/>}/>
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App