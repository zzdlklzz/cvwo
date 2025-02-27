import './App.css';
import background from "/background.jpg";
import { Container } from "@mui/material";
import Homepage from "./Pages/Homepage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Algebra from "./Pages/Algebra.tsx";
import Calculus from "./Pages/Calculus.tsx";
import Geometry from "./Pages/Geometry.tsx";
import NumberTheory from "./Pages/NumberTheory.tsx";
import Others from "./Pages/Others.tsx";
import ProbAndStats from "./Pages/ProbAndStats.tsx";
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import CreatePost from "./Pages/CreatePost.tsx";
import UserPostList from "./Pages/UserPostList.tsx";
import EditPost from "./Pages/EditPost.tsx";
import UserCommentList from "./Pages/UserCommentList.tsx";

function App() {

    return (
        <Container
            className="background" style={{backgroundImage: `url(${background})`}}
            disableGutters={true} maxWidth={false}
            sx={{ minWidth: 1920, minHeight: 980, zIndex: 0, }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/algebra" element={<Algebra/>}/>
                    <Route path="/calculus" element={<Calculus/>}/>
                    <Route path="/geometry" element={<Geometry/>}/>
                    <Route path="/numbertheory" element={<NumberTheory/>}/>
                    <Route path="/probandstats" element={<ProbAndStats/>}/>
                    <Route path="/others" element={<Others/>}/>
                    <Route path="/home" element={<Homepage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/createpost" element={<CreatePost/>}/>
                    <Route path="/userposts" element={<UserPostList/>}/>
                    <Route path="/editpost" element={<EditPost/>}/>
                    <Route path="/usercomments" element={<UserCommentList/>}/>
                    <Route index element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App