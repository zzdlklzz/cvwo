import TopicPageFormat from "./Components/TopicPageFormat.tsx"
import { useLocation } from "react-router-dom";

export default function Geometry() {

    const location = useLocation();
    const user = location.state.name;

    return (
        <>
            <TopicPageFormat topic="geometry" user={user}></TopicPageFormat>
        </>
    );
}