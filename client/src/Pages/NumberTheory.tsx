import TopicPageFormat from "./Components/TopicPageFormat.tsx";
import { useLocation } from "react-router-dom";

export default function NumberTheory() {

    const location = useLocation();
    const user: string = location.state.name;

    return (
        <>
            <TopicPageFormat topic="Number Theory" user={user}></TopicPageFormat>
        </>
    );
}