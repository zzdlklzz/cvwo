import {
    Avatar,
    Box, Button,
    Card, CardActions, CardContent,
    CircularProgress,
    CardHeader, CardMedia,
    Container, Divider,
    List,
    ListItem,
    ListItemButton,
    Modal,
    Typography
} from "@mui/material";
import {ThreadTopic, Post, CommentForm} from "../../types.tsx";
import { useState, useEffect } from "react";
import { AddCommentRounded } from "@mui/icons-material";
import CommentsList from "./CommentsList.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import "../CommentForm.css";

type LoggedUser = {
    ID: number;
    name: string;
}

const USERS_ENDPOINT: string = "http://localhost:4000/api/users";
const POSTS_ENDPOINT: string = "http://localhost:4000/api/posts";
const COMMENTS_ENDPOINT: string = "http://localhost:4000/api/comments";

export default function TopicPostList({ topic, user }: ThreadTopic) {

    const formattedTopic: string = topic == "Probability & Statistics"
        ? "probandstats"
        : topic == "Number Theory"
        ? "numbertheory"
            : topic;

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch(`${POSTS_ENDPOINT}`)
            .then((response) => response.json())
            .then((result) => setPosts(result))
            .catch((error) => console.log(error));
    }, []);

    const topicPosts: Post[] = posts.filter((post: Post) => post.topic == formattedTopic);

    // Handlers for opening posts
    const [openPost, setOpenPost] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
    const handleOpenPost = (post: Post)=> () => {
        setOpenPost(true);
        setSelectedPost(post);
    }
    const handleClosePost = () => {
        setOpenPost(false);
        setSelectedPost(undefined);
    }

    // Comment handlers
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CommentForm>();
    const [openCommentForm, setOpenCommentForm] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [body, setBody] = useState("");

    const createComment: SubmitHandler<CommentForm> = async (data: CommentForm) => {

        setHasError(false);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Fetch user data
        const response = await fetch(`${USERS_ENDPOINT}/${user}`);
        const loggedUser: LoggedUser = await response.json();

        // Create comment
        fetch(`${COMMENTS_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: loggedUser.ID.toString(),
                post_id: selectedPost && selectedPost.ID.toString(),
                body: data.body,
            })
        }).then((response) => {
            if (response.ok) {
                setOpenCommentForm(false);
                setOpenPost(false);
                console.log("Comment created successfully");
                window.location.reload();
            } else {
                setHasError(true);
                console.log("Error creating comment");
            }
        }).catch((error) => console.log(error));
    }

    return (
        <>
            <List>
                { topicPosts.map((post: Post, index: number) => (
                    <ListItem key={post.ID}>
                        <ListItemButton component={Card} elevation={3} onClick={handleOpenPost(post)} sx={{
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
                <Modal open={openPost} onClose={handleClosePost}>
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
                            }}/>
                            <Divider sx={{ border: "1px solid black", }}/>
                            <CardMedia
                                component="img"
                                height={(selectedPost && selectedPost.image) === "" ? "0" : "1000"}
                                image={selectedPost && selectedPost.image}
                                alt="No image selected"
                                style={{ objectFit: "contain" }}>
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
                                <Button variant="contained" onClick={() => setOpenCommentForm(true)} sx={{
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
                <Modal open={openCommentForm} onClose={() => setOpenCommentForm(false)}>
                    <Container sx={{ display: "flex", justifyContent: "center", }}>
                        <Card elevation={24} sx={{
                            display: "flex",
                            flexDirection: "column",
                            mt: 30,
                            height: 400,
                            width: 700, }}>
                            <CardHeader
                                title="Add comment"
                                titleTypographyProps={{ variant: "h2" }}
                                sx={{ bgcolor: "primary.light", }}/>
                            <Divider sx={{ border: "1px solid black", }}/>
                            <CardContent sx={{ bgcolor: "secondary.light", height: 400 }}>
                                <form className="comment-form-wrapper" onSubmit={handleSubmit(createComment)}>
                                    <textarea className="comment-body"
                                        {...register("body", {
                                            required: "Comment cannot be empty",
                                        })}
                                        rows={10}
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        placeholder="Description"/>
                                    {errors.body && (<div className="comment-error">{errors.body.message}</div>)}
                                    {hasError && (<div className="submit-error">Error submitting comment</div>)}
                                    <Box sx={{
                                        ml: 64,
                                    }}>
                                        <Button variant="contained" type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? <CircularProgress size={25}/> : (
                                                <Typography variant="h4">SUBMIT</Typography>
                                            )}
                                        </Button>
                                    </Box>
                                </form>
                            </CardContent>
                        </Card>
                    </Container>
                </Modal>
            </List>
        </>
    );
}


