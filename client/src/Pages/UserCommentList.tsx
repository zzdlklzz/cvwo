// Delete comment functionality is implemented in this component

import { useLocation, useNavigate } from "react-router-dom"
import MenuBar from "./Components/MenuBar.tsx"
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    List,
    ListItem,
    ListItemButton, Modal,
    Typography
} from "@mui/material"
import BackButton from "./Components/BackButton.tsx"
import { UserComment } from "../types.tsx"
import {useEffect, useState} from "react"
import {DeleteForever, Edit} from "@mui/icons-material";

const COMMENTS_ENDPOINT: string = "http://localhost:4000/api/user/comments";
const DELETE_ENDPOINT: string = "http://localhost:4000/api/comments";

export default function UserCommentList() {

    const navigate = useNavigate();
    const location = useLocation();
    const name: string = location.state.name;
    const userID: string = location.state.user_id;

    const [userComments, setUserComments] = useState<UserComment[]>([])
    const [deleteOpen, setDeleteOpen] = useState(false); // Delete comment popup message
    const [selectedComment, setSelectedComment] = useState<UserComment>()
    const [hasError, setHasError] = useState(false);

    const fetchCommentData = async () => {
        const response = await fetch(`${COMMENTS_ENDPOINT}/${userID}`)
        const userComments: UserComment[] = await response.json();
        return userComments;
    }

    // Fetch user's comments
    useEffect(() => {
        fetchCommentData().then((result) => setUserComments(result))
            .catch((error) => console.log(error));
    }, []);

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setSelectedComment(undefined);
        setHasError(false);
    }

    const handleDelete = (comment: UserComment) =>
        async () => {

            await new Promise((resolve) => setTimeout(resolve, 1000));

            fetch(`${DELETE_ENDPOINT}/${comment.ID}`, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    setDeleteOpen(false);
                    setSelectedComment(undefined);
                    window.location.reload();
                    console.log("Comment deleted successfully");
                } else {
                    setHasError(true);
                }
            }).catch((error) => console.log(error));
        }

    const userCommentList = (
        <Box>
            <List>
                { userComments && userComments.map((comment) => (
                    <ListItem key={comment.ID}>
                        <ListItemButton component={Card} elevation={3} sx={{
                            bgcolor: "secondary.main",
                            height: 200,
                            width: "100%",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: 2,
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                width: 900,
                                gap: 4,
                            }}>
                                <Typography variant="h2">{ "Topic: " +
                                    (comment.post.topic === "probandstats"
                                        ? "PROBABILITY & STATISTICS"
                                        : comment.post.topic === "numbertheory"
                                            ? "NUMBER THEORY"
                                            : comment.post.topic.toUpperCase())
                                }</Typography>
                                <Typography variant="h3">{ "Post Title: " +
                                    (comment.post.title.length > 40
                                        ? comment.post.title.substring(0, 39) + "..."
                                        : comment.post.title)
                                }</Typography>
                                <Typography variant="h4">{ "Comment: " +
                                    (comment.body.length > 40
                                        ? comment.body.substring(0, 39) + "..."
                                        : comment.body)
                                }</Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                height: 200,
                                mt: -1,
                            }}>
                                <Button variant="contained" onClick={() => {
                                    // navigate("/editcomment", { state: {id: comment.ID, name}})
                                }} sx={{
                                    height: 50,
                                    width: 130,
                                    gap: 1,
                                }}>
                                    <Edit/>
                                    <Typography variant="h4">EDIT</Typography>
                                </Button>
                                <Button variant="contained" onClick={() => {
                                    setSelectedComment(comment);
                                    setDeleteOpen(true);
                                }} sx={{
                                    bgcolor: "#EA4444",
                                    height: 50,
                                    width: 130,
                                    gap: 1,
                                }}>
                                    <DeleteForever/>
                                    <Typography variant="h4">DELETE</Typography>
                                </Button>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                ))}
                <Modal open={deleteOpen} onClose={handleDeleteClose}>
                    <Container sx={{ display: "flex", justifyContent: "center", }}>
                        <Box component={Card} elevation={24} sx={{
                            bgcolor: "secondary.main",
                            mt: 40,
                            height: 200,
                            width: 700,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            borderRadius: 5,
                        }}>
                            { hasError && (<Typography variant="h4" sx={{
                                fontSize: 18,
                                position: "absolute",
                                mb: 4,
                                color: "red",
                            }}>Failed to delete comment</Typography>) }
                            <Typography variant="h3">Are you sure you want to delete this comment?</Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-evenly", gap: 20, }}>
                                <Button variant="contained" onClick={handleDelete(selectedComment!)} sx={{
                                    bgcolor: "#EA4444",
                                    height: 50,
                                    width: 150,
                                }}>yes</Button>
                                <Button variant="contained" onClick={handleDeleteClose} sx={{
                                    height: 50,
                                    width: 150,
                                }}>no</Button>
                            </Box>
                        </Box>
                    </Container>
                </Modal>
            </List>
        </Box>
    );

    return (
        <>
            <MenuBar name={name}/>
            <Container disableGutters={true} sx={{
                width: 1150,
                height: 700,
                maxHeight: 700,
                position: "relative",
                top: 80,
                flexDirection: "column",
            }}>
                <Card elevation={24} sx={{ bgcolor: "primary.light" }}>
                    <Container disableGutters={true} sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Typography variant="h1" sx={{
                            color: "white",
                            height: 100,
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            ml: 5,
                        }}>{name}'s Comments</Typography>
                        <Button variant="contained" onClick={() => {
                            navigate("/userposts", { state: {name} })
                        }} sx={{
                            height: 60,
                            width: 200,
                            mr: 6,
                            bgcolor: "primary.dark",
                        }}>
                            <Typography variant="h3">MY POSTS</Typography>
                        </Button>
                    </Container>
                    <Divider sx={{ borderColor: "black", }}></Divider>
                    <Card elevation={0} sx={{
                        bgcolor: "secondary.light",
                        width: "100%",
                        height: 600,
                        maxHeight: 600,
                        overflowY: "auto",
                        overflowX: "hidden",
                        position: "relative",
                    }}>
                        <CardContent sx={{ width: "97.3%", }}>
                            {userCommentList}
                        </CardContent>
                    </Card>
                    <Divider sx={{ borderColor: "black", }}></Divider>
                    <Box sx={{ height: 50,}}/>
                </Card>
            </Container>
            <BackButton/>
        </>
    );
}