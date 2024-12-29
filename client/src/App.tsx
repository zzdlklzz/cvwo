import './App.css';
import background from "/background.jpg";
import { Container } from "@mui/material";
import Homepage from "./Pages/Homepage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {

    return (
        <Container
            className="background" style={{backgroundImage: `url(${background})`}}
            disableGutters="false" maxWidth="false"
            sx={{minWidth: 1680}}>
            <BrowserRouter>
                <Routes>
                    {/*<Route path="/algebra" element={<Algebra/>}/>*/}
                    <Route path="/" element={<Homepage/>}/>
                    <Route index element={<Homepage/>}/>
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App