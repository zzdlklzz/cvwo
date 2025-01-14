import TopicPageFormat from "./Components/TopicPageFormat.tsx";
import { useLocation } from "react-router-dom";

export default function ProbAndStats() {

    const location = useLocation();
    const user: string = location.state.name;

    return (
        <>
            <TopicPageFormat topic="Probability & Statistics" user={user}></TopicPageFormat>
        </>
    );
}