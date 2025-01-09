import TopicPageFormat from "./Components/TopicPageFormat.tsx"
import {useLocation} from "react-router-dom";

export default function Others() {

    const location = useLocation();
    const user = location.state.name;

    return (
        <>
            <TopicPageFormat topic="others" user={user}></TopicPageFormat>
        </>
    );
}