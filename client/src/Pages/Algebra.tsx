import TopicPageFormat from "./Components/TopicPageFormat.tsx"
import { useLocation } from "react-router-dom"

export default function Algebra() {

    const location = useLocation();
    const user = location.state.name;

    return (
        <>
            <TopicPageFormat topic="algebra" user={user}></TopicPageFormat>
        </>
    );
}