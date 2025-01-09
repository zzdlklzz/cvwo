import {
    Avatar,
    Box, Button,
    Card, CardActions, CardContent,
    CardHeader, CardMedia,
    Container, Divider,
    List,
    ListItem,
    ListItemButton,
    Modal,
    Typography
} from "@mui/material"
import { ThreadTopic, Post } from "../../types.tsx"
import { useState, useEffect } from "react"
import { AddCommentRounded } from "@mui/icons-material";
import CommentsList from "./CommentsList.tsx"

// To implement function to add comment

// For no image upload, value of image should be empty string

const ENDPOINT: string = "http://localhost:4000/api/posts";

export default function PostList({ topic, user }: ThreadTopic) {

    const formattedTopic: string = topic == "Probability & Statistics"
        ? "probandstats"
        : topic == "Number Theory"
        ? "numbertheory"
            : topic;

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch(`${ENDPOINT}`)
            .then((response) => response.json())
            .then((result) => setPosts(result))
            .catch((error) => console.log(error));
    }, []);

    const topicPosts: Post[] = posts.filter((post) => post.topic == formattedTopic);

    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
    const handleOpen = (post: Post)=> () => {
        setOpen(true);
        setSelectedPost(post);
    }
    const handleClose = () => {
        setOpen(false);
        setSelectedPost(undefined);
    }

    return (
        <>
            <List>
                { topicPosts.map((post, index) => (
                    <ListItem>
                        <ListItemButton component={Card} elevation={3} onClick={handleOpen(post)} sx={{
                            bgcolor: "secondary.main",
                            height: 200,
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: 2,
                        }}>
                            <Box sx={{ display: "flex", width: "100%", gap: 3, }}>
                                <Typography variant="h2">#{index + 1}</Typography>
                                <Avatar sx={{ bgcolor: "secondary.dark" }}>{post.user.name[0].toUpperCase()}</Avatar>
                                <Typography variant="h2">{post.user.name}</Typography>
                            </Box>
                            <Typography variant="h2" sx={{ fontWeight: "bold", }}>{post.title}</Typography>
                            <Typography variant="h3">{post.body}</Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
                <Modal open={open} onClose={handleClose}>
                    <Container sx={{ display: "flex", justifyContent: "center", }}>
                        <Card sx={{
                            bgcolor: "secondary.light",
                            mt: 7,
                            height: 800,
                            width: 1000,
                            overflowY: "auto",
                            overflowX: "auto",
                        }}>
                            <CardHeader avatar={
                                <Avatar sx={{ bgcolor: "secondary.dark", height: 70, width: 70, fontSize: 32, }}>
                                    {selectedPost && selectedPost.user.name[0].toUpperCase()}
                                </Avatar>
                            } title={selectedPost && selectedPost.title} titleTypographyProps={{
                                variant: "h2",
                            }} sx={{
                                bgcolor: "primary.light",
                                color: "white",
                                height: 100,
                                p: 5,
                                gap: 2.5,
                            }}>
                            </CardHeader>
                            <Divider sx={{ border: "1px solid black", }}/>
                            <CardMedia
                                component="img"
                                height={(selectedPost && selectedPost.image) === "" ? "0" : "1500"}
                                image={selectedPost && selectedPost.image}
                                alt="No image selected">
                            </CardMedia>
                            <Divider sx={{ border: "1px solid black", }}/>
                            <CardContent sx={{ bgcolor: "secondary.main", }}>
                                <Typography variant="h4">{selectedPost && selectedPost.body}</Typography>
                            </CardContent>
                            <Divider sx={{ border: "1px solid black", }}/>
                            <CardActions sx={{
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "center",
                            }}>
                                <Button variant="contained" sx={{
                                    mr: 0,
                                    height: 50,
                                    width: 160,
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 1,
                                }}>
                                    <AddCommentRounded></AddCommentRounded>
                                    <Typography variant="h3">COMMENT</Typography>
                                </Button>
                            </CardActions>
                            <CommentsList id={selectedPost && selectedPost.ID}></CommentsList>
                        </Card>
                    </Container>
                </Modal>
            </List>
        </>
    );
}


