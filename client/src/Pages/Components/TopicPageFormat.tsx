import MenuBar from "./MenuBar.tsx"
import BackButton from "./BackButton.tsx"
import {Button, Card, CardActions, CardContent, Container, Divider, Typography} from "@mui/material"
import { ThreadTopic } from "../../types.tsx"
import PostList from "./PostList.tsx"
import { AddRounded } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

export default function TopicPageFormat({ topic, user }: ThreadTopic ) {

    const navigate = useNavigate();

    return (
        <>
            <MenuBar name={user}/>
            <Container disableGutters={true} sx={{
                width: 1150,
                height: 700,
                maxHeight: 700,
                position: "relative",
                top: 80,
                flexDirection: "column",
            }}>
                <Card elevation={24} sx={{ bgcolor: "primary.light" }}>
                    <Typography variant="h1" sx={{
                        color: "white",
                        height: 100,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        ml: 5,
                    }}>{topic.toUpperCase()}</Typography>
                    <Divider sx={{ borderColor: "black", }}></Divider>
                    <Card elevation={0} sx={{
                        bgcolor: "secondary.light",
                        width: "100%",
                        height: 700,
                        maxHeight: 600,
                        overflowY: "auto",
                        overflowX: "hidden",
                        position: "relative",
                    }}>
                        <CardContent sx={{ width: "97.3%", }}>
                            <PostList topic={topic} user={user}></PostList>
                        </CardContent>
                    </Card>
                    <CardActions sx={{
                        bgcolor: "secondary.light",
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                    }}>
                        <Button variant="contained" onClick={() => {
                            navigate("/createpost", { state: {topic, name: user} })
                        }} sx={{
                            mr: 3,
                            height: 50,
                            width: 160,
                            display: "flex",
                            justifyContent: "center",
                            gap: 1.5,
                        }}>
                            <AddRounded/>
                            <Typography variant="h3">CREATE</Typography>
                        </Button>
                    </CardActions>
                </Card>
            </Container>
            <BackButton/>
        </>
    );
}