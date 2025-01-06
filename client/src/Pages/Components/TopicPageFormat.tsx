import MenuBar from "./MenuBar.tsx"
import BackButton from "./BackButton.tsx"
import {Button, Card, CardActions, CardContent, Container, Divider, Typography} from "@mui/material"
import { ThreadTopic } from "../../types.tsx"
import PostList from "./PostList.tsx"
import { AddRounded } from "@mui/icons-material"

// To implement function for creating post

export default function TopicPageFormat({ topic }: ThreadTopic ) {
    return (
        <>
            <MenuBar/>
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
                            <PostList topic={topic}></PostList>
                        </CardContent>
                    </Card>
                    <CardActions sx={{
                        bgcolor: "secondary.light",
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                    }}>
                        <Button variant="contained" sx={{
                            mr: 3,
                            height: 50,
                            width: 160,
                            display: "flex",
                            justifyContent: "center",
                            gap: 1.5,
                        }}>
                            <AddRounded></AddRounded>
                            <Typography variant="h3">CREATE</Typography>
                        </Button>
                    </CardActions>
                </Card>
            </Container>
            <BackButton/>
        </>
    );
}