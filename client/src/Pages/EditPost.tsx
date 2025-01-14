import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { PostForm, UserPost } from "../types.tsx";
import { useEffect, useState } from "react";
import MenuBar from "./Components/MenuBar.tsx";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Typography
} from "@mui/material";
import BackButton from "./Components/BackButton.tsx";
import { SubmitHandler, useForm} from "react-hook-form";
import "./EditPost.css";
import ImageToBase64 from "./functions/ImageToBase64.tsx";

const ENDPOINT: string = "http://localhost:4000/api/posts";

export default function EditPost() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostForm>();
    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();
    const name: string = location.state.name;
    const post_id: string = location.state.id;
    const [post, setPost] = useState<UserPost>();
    const [hasError, setHasError] = useState(false);

    // Form value handlers
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");

    const fetchPostData = async () => {
        const response = await fetch(`${ENDPOINT}/${post_id}`);
        const userPost: UserPost = await response.json(); // Fetch post data
        return userPost;
    }

    // Fetch post data
    useEffect(() => {
        fetchPostData().then((result: UserPost) => {
            setPost(result);
            setTitle(result.title);
            setBody(result.body);
            setImage(result.image);
        })
            .catch((error) => console.log(error));
    }, []);

    // Edit post function
    const editPost: SubmitHandler<PostForm> = async (data: PostForm) => {

        setHasError(false);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const fileImage: File | undefined = data.image[0];
        let newImage;

        if (fileImage !== undefined) {
            newImage = await ImageToBase64(fileImage);
        } else {
            newImage = image;
        }

        fetch(`${ENDPOINT}/${post_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: data.title,
                body: data.body,
                image: newImage,
            })
        }).then((response) => {
            if (response.ok) {
                navigate("/userposts", { state: {name} });
                console.log("Post edited successfully");
            } else {
                setHasError(true);
            }
        })
    }

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
                    }}>{post && post.topic.toUpperCase()}</Typography>
                    <Divider sx={{ borderColor: "black", }}></Divider>
                    <Card elevation={0} sx={{
                        bgcolor: "secondary.light",
                        width: 1150,
                        height: 700,
                        maxHeight: 600,
                        overflowY: "auto",
                        overflowX: "hidden",
                        position: "relative",
                    }}>
                        <CardContent sx={{ display: "flex", justifyContent: "center", width: "100%", }}>
                            <form className="edit-form-wrapper" onSubmit={handleSubmit(editPost)}>
                                <img src={image} alt="No image selected" height={image === "" ? 0 : 500} style={{
                                    objectFit: "contain",
                                }}/>
                                <input
                                    className="edit-title"
                                    {...register("title", {
                                        required: "Title cannot be empty",
                                    })}
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}/>
                                {errors.title && (<Typography variant="h4" sx={{
                                    position: "absolute",
                                    mt: image === "" ? 15 : 78,
                                    mr: 95,
                                    color: "red",
                                }}>{errors.title.message}</Typography>)}
                                <textarea
                                    className="edit-body"
                                    {...register("body")}
                                    rows={10}
                                    placeholder="Description"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}/>
                                {hasError && (<Typography variant="h4" sx={{
                                    fontSize: 18,
                                    position: "absolute",
                                    mt: image === "" ? 47 : 116,
                                    ml: 102,
                                    color: "red",
                                }}>Error editing post</Typography>)}
                                <div className="edit-button-wrapper">
                                    <input
                                        {...register("image")}
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                    />
                                    <Button variant="contained" disabled={isSubmitting} type="submit" sx={{
                                        height: 40,
                                        width: 160,
                                    }}>
                                        {isSubmitting ? <CircularProgress size={25}/> : (
                                            <Typography variant="h4">EDIT POST</Typography>
                                        )}
                                    </Button>
                                </div>
                                <Box sx={{
                                    position: "absolute",
                                    width: "100%",
                                    mt: image === "" ? 55 : 117,
                                }}>
                                    <Typography variant="h4" color="primary" sx={{
                                        mr: 70,
                                    }}>
                                        Choose file to replace current image
                                    </Typography>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                    <CardActions sx={{
                        bgcolor: "secondary.light",
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                    }}>
                    </CardActions>
                </Card>
            </Container>
            <BackButton/>
        </>
    );
}