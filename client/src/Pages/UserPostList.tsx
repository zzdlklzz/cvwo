// Page with list of user's post
// Delete post function is within this element, edit post is in a separate element

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
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
import MenuBar from "./Components/MenuBar.tsx"
import { DeleteForever, Edit } from "@mui/icons-material"
import BackButton from "./Components/BackButton.tsx"
import { UserPost } from "../types.tsx"

type LoggedUser = {
    ID: string;
    name: string;
}

const USER_ENDPOINT: string = "http://localhost:4000/api/users";
const POSTS_ENDPOINT: string = "http://localhost:4000/api/posts/user";
const DELETE_ENDPOINT: string = "http://localhost:4000/api/posts";

export default function UserPostList() {

    const navigate = useNavigate();
    const location = useLocation();
    const name: string = location.state.name;
    const [userPosts, setUserPosts] = useState<UserPost[]>();
    const [deleteOpen, setDeleteOpen] = useState(false); // Delete post popup message
    const [selectedPost, setSelectedPost] = useState<UserPost>();
    const [hasError, setHasError] = useState(false);

    const fetchData = async () => {
        const userResponse = await fetch(`${USER_ENDPOINT}/${name}`);
        const loggedUser: LoggedUser = await userResponse.json(); // Fetch user data to use user ID for post fetch
        const postsResponse = await fetch(`${POSTS_ENDPOINT}/${loggedUser.ID}`)
        const userPosts: UserPost[] = await postsResponse.json();
        return userPosts;
    }

    // Fetch user's posts
    fetchData().then((result) => setUserPosts(result))
        .catch((error) => console.log(error));

    const handleDelete = (post: UserPost) =>
        async () => {

            await new Promise((resolve) => setTimeout(resolve, 1000));

            fetch(`${DELETE_ENDPOINT}/${post.ID}`, {
                method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    setDeleteOpen(false);
                    console.log("Post deleted successfully");
                } else {
                    setHasError(true);
                }
            }).catch((error) => console.log(error));
    }

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setSelectedPost(undefined);
        setHasError(false);
    }

    const userPostList = (
        <Box>
            <List>
                { userPosts && userPosts.map( (post) => (
                    <ListItem key={post.ID}>
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
                                    (post.topic === "probandstats"
                                        ? "PROBABILITY & STATISTICS"
                                        : post.topic === "numbertheory"
                                        ? "NUMBER THEORY"
                                        : post.topic.toUpperCase())
                                }</Typography>
                                <Typography variant="h3">{ "Title: " +
                                    (post.title.length > 40 ? post.title.substring(0, 39) + "..." : post.title)
                                }</Typography>
                                <Typography variant="h4">{ "Description: " +
                                    (post.body.length > 40 ? post.body.substring(0, 39) + "..." : post.body)
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
                                    navigate("/editpost", { state: {id: post.ID, name}})
                                }} sx={{
                                    height: 50,
                                    width: 130,
                                    gap: 1,
                                }}>
                                    <Edit/>
                                    <Typography variant="h4">EDIT</Typography>
                                </Button>
                                <Button variant="contained" onClick={() => {
                                    setDeleteOpen(true);
                                    setSelectedPost(post);
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
                    ))
                }
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
                            }}>Failed to delete post</Typography>) }
                            <Typography variant="h3">Are you sure you want to delete this post?</Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-evenly", gap: 20, }}>
                                <Button variant="contained" onClick={
                                    handleDelete(selectedPost!)
                                } sx={{
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
                    <Typography variant="h1" sx={{
                        color: "white",
                        height: 100,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        ml: 5,
                    }}>{name}'s Posts</Typography>
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
                            {userPostList}
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