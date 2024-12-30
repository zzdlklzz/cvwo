import MenuBar from "./MenuBar.tsx"
import BackButton from "./BackButton.tsx"
import { Container } from "@mui/material"

export default function TopicPageFormat({ topic, image }) {
    return (
        <>
            <MenuBar/>
                <Container sx={{
                    bgcolor: "red",
                    width: "100%",
                    position: "absolute",
                    top: 80,
                    left: 340
                }}>
                    main container where threads/list of threads will be
                </Container>
            <BackButton/>
        </>
    );
}