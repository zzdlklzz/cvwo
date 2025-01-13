import { useLocation, useNavigate } from "react-router-dom"
import MenuBar from "./Components/MenuBar.tsx"
import { Card, CardActions, CardContent, CircularProgress, Container, Divider, Typography } from "@mui/material"
import BackButton from "./Components/BackButton.tsx"
import { SubmitHandler, useForm } from "react-hook-form"
import { PostForm } from "../types.tsx"
import "./CreatePost.css"
import { useEffect, useState } from "react"
import ImageToBase64 from "./functions/ImageToBase64.tsx"

type LoggedUser = {
    ID: number;
    name: string;
}

const USERS_ENDPOINT: string = "http://localhost:4000/api/users";
const POSTS_ENDPOINT: string = "http://localhost:4000/api/posts";

export default function CreatePost() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostForm>();
    const navigate = useNavigate();
    const location = useLocation();
    const name: string = location.state.name;
    const topic: string = location.state.topic;
    const formattedTopic: string = topic == "Probability & Statistics"
        ? "probandstats"
        : topic == "Number Theory"
            ? "numbertheory"
            : topic;

    const [loggedUser, setLoggedUser] = useState<LoggedUser>();
    const [hasError, setHasError] = useState(false);

    let image;

    // Fetch user data
    useEffect(() => {
        fetch(`${USERS_ENDPOINT}/${name}`)
            .then((response) => response.json())
            .then((result) => { setLoggedUser(result);})
            .catch((error) => console.log(error));
    }, []);

    const createPost: SubmitHandler<PostForm> = async (data) => {

        setHasError(false);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const fileImage: File | undefined = data.image[0];

        if (fileImage !== undefined) {
            image = await ImageToBase64(fileImage);
        } else {
            image = "";
        }

        fetch(`${POSTS_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                topic: formattedTopic,
                title: data.title,
                body: data.body,
                image: image,
                user_id: loggedUser && loggedUser.ID.toString(),
            })
        }).then((response) => {
            if (response.ok) {
                navigate("/" + formattedTopic, { state: {topic, name} })
                console.log("Post created successfully");
            } else {
                setHasError(true);
            }
        }).catch((error) => console.log(error));

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
                    }}>{topic.toUpperCase()}</Typography>
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
                            <form className="form-wrapper" onSubmit={handleSubmit(createPost)}>
                                <input
                                    className="title"
                                    {...register("title", {
                                        required: "Title cannot be empty",
                                    })}
                                    type="text"
                                    placeholder="Title"/>
                                {errors.title && (<div className="name-error">{errors.title.message}</div>)}
                                <textarea
                                    className="body"
                                    {...register("body")}
                                    rows={10}
                                    placeholder="Description"/>
                                { hasError && (<Typography variant="h4" sx={{
                                    fontSize: 18,
                                    position: "absolute",
                                    mt: 47,
                                    ml: 99,
                                    color: "red",
                                }}>Failed to create post</Typography>) }
                                <div className="button-wrapper">
                                    <input
                                        {...register("image")}
                                        type="file"
                                        id="image"
                                        accept="image/*"/>
                                    <button className="button"
                                            disabled={isSubmitting}
                                            type="submit">
                                        {isSubmitting ? <CircularProgress size={25}/> : "Create Post"}
                                    </button>
                                </div>
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