import TopicPageFormat from "./Components/TopicPageFormat.tsx"
import { useLocation } from "react-router-dom"

export default function Calculus() {

    const location = useLocation();
    const user = location.state.name;

    return (
        <>
            <TopicPageFormat topic="calculus" user={user}></TopicPageFormat>
        </>
    );
}